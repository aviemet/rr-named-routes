import { route, deepNestedObject } from './route';
import { CallableChainable, callableChainableHandler } from './callableChainable';

export class NamedRoutes {
	rawRoutes: deepNestedObject<string>
	proxyRoutes: CallableChainable

	constructor(routes: deepNestedObject<string>) {
		this.rawRoutes = route('', routes)
		this.validateRoutes(this.rawRoutes)
		return this
	}

	get routes() {
		if(!this.proxyRoutes) {
			this.proxyRoutes = this.createProxyRoutes()
		}
		return this.proxyRoutes
	}

	/**
	 * Validations:
	 * Only 1 use of a variable parameter per route chain.
	 *   /users/:userId and /admin/:userId are ok, but
	 *   /users/:id and /users/:id/lists/:id are not ok
	 * No prohibited characters for a url
	 *  - also -
	 * Sanitize routes for html entities
	 * @param routes routes object to validate
	 */
	validateRoutes(routes: deepNestedObject<string>) {
		for(const [_, value] of Object.entries(routes)) {
			if(typeof value === 'string') {
				this.testConflictingParams(value)
			} else {
				this.validateRoutes(value)
			}
		}
	}

	private

	createProxyRoutes(): CallableChainable {
		return new Proxy(new CallableChainable(this.rawRoutes), callableChainableHandler)
	}

	testConflictingParams(path: string) {
		const variableParams = new Set()
		
		path.split('/').forEach(segment => {
			if(segment.charAt(0) !== ':') return

			if(variableParams.has(segment)) {
				throw new Error(`Error: ${segment} is already used as a parameter value on another route`)
			} else {
				variableParams.add(segment)
			}
		})
	}

}

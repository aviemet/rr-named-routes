import { route } from './route'
import { CallableChainable, callableChainableHandler } from './callableChainable';

export class NamedRoutes {
	rawRoutes
	proxyRoutes

	constructor(routes: object) {
		this.validateRoutes(routes)
		this.rawRoutes = route('', routes)
		return this
	}

	get routes() {
		if(!this.proxyRoutes) {
			this.proxyRoutes = this.createProxyRoutes(this.rawRoutes)
		}
		return this.proxyRoutes
	}

	createProxyRoutes(routes) {
		return new Proxy(new CallableChainable(routes), callableChainableHandler)
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
	validateRoutes(routes) {
		for(const [key, value] of Object.entries(routes)) {
			if(typeof value === 'string') {
				this.testConflictingParams(value)
			} else {
				this.validateRoutes(value)
			}
		}
	}

	private
	testConflictingParams(path) {
		const variableParams = new Set()
		const segments = path.split('/')
		segments.forEach(segment => {
			if(segment.charAt(0) !== ':') return

			if(variableParams.has(segment)) {
				throw new Error(`Error: ${segment} is already used as a parameter value on another route`)
			} else {
				variableParams.add(segment)
			}
		})
	}

}

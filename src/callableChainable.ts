import { generatePath } from "react-router"

import { INDEX } from './route'

// Convert routes object to paths object
export const pathsToCallableProxy = (routes: object): any => {
	return new Proxy(new CallableChainable(routes), callableChainableHandler)
}

// Object who's elements are both chainable and callable
export class CallableChainable extends Function {
	params = new Set()

	constructor(routes: object) {
		super()

		this[INDEX] = routes[INDEX]

		for(const [key, value] of Object.entries(routes)) {
			if(key !== INDEX) {
				this.testDuplicateParams(value)

				const route = {}
				route[key] = value
				this[key] = new Proxy(new CallableChainable(value), callableChainableHandler)
			}
		}

		// It doesn't acount for much, but might as well clear the memory
		this.params.clear()

    //@ts-ignore
		return new Proxy(this, callableChainableHandler)
	}

	testDuplicateParams(param) {
		// Only test params which start with ':' and have no trailing path values
		const match = param.replace(/^\/|\/$/, '')
		if(/^:\w*$/.test(match)) {
			if(this.params.has(match)) {
				throw new Error(`Error: ${match} is already used as a parameter value on another route`)
			}

			this.params.add(match)
		}
	}
}

// Proxy second argument
const callableChainableHandler = {
	get: function(target: object, key: string) {
		// Ignore node inspection triggering Symbol util.inspect.custom trap (happens in jest)
		if(typeof key !== 'string') return
		if(!target[key]) {
			console.log({ key, target })
			throw new Error(`Error: route ${target[INDEX]}/${key} does not exist`)
		}
		return target[key]
	},
	apply: function(target: object, _: object, args: any[]) {
		if(args.length > 0) {
			return generatePath(target[INDEX], args[0])
		}
		return target[INDEX]
	}
}

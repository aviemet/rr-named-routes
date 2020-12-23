import { generatePath } from 'react-router'

import { deepNestedObject, INDEX } from './route'

interface nestedCallableChainable {
	[key: string]: any
}

// Object who's elements are both callable and chainable
export class CallableChainable extends Function {

	constructor(routes: string | deepNestedObject<string>) {
		super()

		this[INDEX] = routes[INDEX]

		for(const [key, value] of Object.entries(routes)) {
			if(key !== INDEX) {
				const route = {}
				route[key] = value
				this[key] = new Proxy<CallableChainable>(new CallableChainable(value), callableChainableHandler)
			}
		}

		return new Proxy(this, callableChainableHandler)
	}
}

export const callableChainableHandler: ProxyHandler<CallableChainable> = {
	get: function(target: CallableChainable, key: string): CallableChainable {		
		if(!target[key]) {
			throw new Error(`Error: route ${target[INDEX]}/${key} does not exist`)
		}
		return target[key]
	},
	apply: function(target: CallableChainable, _: any, args: Record<string, string>[]): string {
		if(args.length > 0) {
			return generatePath(target[INDEX], args[0])
		}
		return target[INDEX]
	}
}

import * as React from 'react'
import { generatePath } from "react-router"

const INDEX = "__index__"

// Proxy second argument
const callableChainableHandler = {
	get: function(target: object, key: string) {
		if(!target[key]) {
			console.error(`Error: route ${target[INDEX]}/${key} does not exist`)
			return false
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

// Convert routes object to paths object
const pathsToCallableProxy = (routes: object) => {
	const paths = routes

	for(const [key, value] of Object.entries(routes)) {
		if(typeof value === 'object') {
			paths[key] = new Proxy(new CallableChainable(value), callableChainableHandler)
		}
	}

	return paths
}

// Object who's elements are both chainable and callable
class CallableChainable extends Function {
	constructor(routes: object) {
		super()

		this[INDEX] = routes[INDEX]

		for(const [key, value] of Object.entries(routes)) {
			if(key !== INDEX) {
				const route = {}
				route[key] = value
				this[key] = new Proxy(new CallableChainable(value), callableChainableHandler)
			}
		}

    //@ts-ignore
		return new Proxy(this, callableChainableHandler)
	}
}

/**
 * Called in a routes object definition
 * Flattens the provided object using `base` as the beginning of the route
 * @param base 
 * @param routes 
 */
export const nested = (base: string, routes: object) => {
	let mappedRoutes: any = {}

	const indexedRoutes = routes
	if(!indexedRoutes.hasOwnProperty(INDEX)) {
		indexedRoutes[INDEX] = "/"
	}

	for(const [key, value] of Object.entries(indexedRoutes)) {
		if(typeof value === 'string') {
			if(key === INDEX) {
				mappedRoutes[INDEX] = `${base}${value}`
			} else {
				mappedRoutes[key] = {}
				mappedRoutes[key][INDEX] = `${base}${value}`
			}
		} else if(typeof value === 'object') {
			mappedRoutes[key] = nested(base, value)
		}
	}

	return mappedRoutes
}

type NamedRoutesHookObject = {[key: string]: any}

/**
 * Hook for using named routes in a react-router project
 * @param routes routes object
 */
const NamedRouteContext = React.createContext<NamedRoutesHookObject>({})
export const useNamedRoutes = () => React.useContext(NamedRouteContext)

export const NamedRoutesProvider: React.FC<{value: object, children: any}> = ({ value, children }) => {
	
	let memoizedRoutes = React.useMemo(() => {
		const nestedValue = nested("", value)
		return pathsToCallableProxy(nestedValue)
	}, [value])
	
	return (
		<NamedRouteContext.Provider value={ memoizedRoutes }>
			{ children }
		</NamedRouteContext.Provider>
	)
}

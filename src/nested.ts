export const INDEX = "__index__"

/**
 * Called in a routes object definition
 * Flattens the provided object using `base` as the beginning of the route
 * @param base 
 * @param routes 
 */
export const nested = (base: string, routes: object) => {
	// Give each path an index to overwrite
	routes[INDEX] = routes[INDEX] || ""

	const mappedRoutes: any = {}
	for(const [key, value] of Object.entries(routes)) {
		if(typeof value === 'string') {
			testDuplicateParams(value)

			const path = `${slash(base)}${slash(value.replace(/^\//, ''))}` || '/'

			if(key === INDEX) {
				mappedRoutes[INDEX] = path
			} else {
				mappedRoutes[key] = {
					[INDEX]: path
				}
			}
		} else if(typeof value === 'object') {
			mappedRoutes[key] = nested(base, value)
		}
	}

	return mappedRoutes
}

const params = new Set()
const testDuplicateParams = param => {
	// Only test params which start with ':' and have no trailing path values
	const match = param.replace(/^\/|\/$/, '')
	if(/^:\w*$/.test(match)) {
		if(params.has(match)) {
			throw new Error(`Error: ${match} is already used as a parameter value on another route`)
		}

		params.add(match)
	}
}

const slash = str =>  `${str === '' ? '' : '/'}${str}`

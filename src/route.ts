export const INDEX = "__index__"

/**
 * Called in a routes object definition
 * Flattens the provided object using `base` as the beginning of the route
 * @param base 
 * @param routes 
 */
export const route = (base: string, routes: object) => {
	// Give each path an index to overwrite
	routes[INDEX] = routes[INDEX] || ""

	const mappedRoutes: any = {}
	for(const [key, value] of Object.entries(routes)) {
		if(typeof value === 'string') {

			const path = slash(`${slash(base)}${slash(value)}`)

			if(key === INDEX) {
				mappedRoutes[INDEX] = path
			} else {
				mappedRoutes[key] = {
					[INDEX]: path
				}
			}
		} else if(typeof value === 'object') {
			mappedRoutes[key] = route(base, value)
		}
	}

	return mappedRoutes
}

const slash = str => `/${str.replace(/^\/+|\/+$/g, '')}`

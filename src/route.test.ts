import { 
	routesNoSlashes,
	routesAllSlashes,
	routesSomeSlashes,
	routesWithBase,
	routesResults,
	adminRoutesResults
} from './route.mock'

describe('route', () => {
	test('outputs properly formed indexed routes object', () => {
		expect(routesNoSlashes).toEqual(routesResults)
		expect(routesAllSlashes).toEqual(routesResults)
		expect(routesSomeSlashes).toEqual(routesResults)
		expect(routesWithBase).toEqual(adminRoutesResults)
	})
})

import { route } from './route'
import { 
	routesNoSlashes,
	routesAllSlashes,
	routesSomeSlashes,
	routesWithBase,
	routesNotRouted,
	routesResults,
	adminRoutesResults
} from './route.mock'

describe('route', () => {
	test('outputs properly formed indexed routes object', () => {
		expect(routesNoSlashes).toEqual(routesResults)
	})
})


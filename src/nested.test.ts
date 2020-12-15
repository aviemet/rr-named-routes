import { nested } from './nested'
import { 
	routesNoSlashes,
	/*routesAllSlashes,
	routesSomeSlashes,
	routesNotNested,*/
	routesResults
} from './route.mock'

describe('nested', () => {
	test('outputs properly formed indexed routes object', () => {
		expect(routesNoSlashes).toEqual(routesResults)
	})

	test('throws error with reused variable path', () => {
		expect(() => nested('', {
			users: nested('users', {
				id: nested(':id', {
					accounts: nested('accounts', {
						id: ':id'
					})
				})
			})
		})).toThrow()
	})
})

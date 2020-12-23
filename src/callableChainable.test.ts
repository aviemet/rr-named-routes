import { NamedRoutes } from './namedRoutes';
import { route } from './route'
import { routesNoSlashes } from './route.mock'

describe('NamedRoutes Object', () => {
	test('throws error with reused variable parameter', () => {
		expect(() => new NamedRoutes(route('', {
			users: route('users', {
				id: route(':id', {
					accounts: route('accounts', {
						id: ':id'
					})
				})
			})
		}))).toThrow()
	})

	test('doesn\'t throw an error if reused variable parameter is in different path', () => {
		expect(() => new NamedRoutes(route('', {
			users: route('users', {
				id: ':id'
			}),
			events: route('events', {
				id: ':id'
			})
		}))).not.toThrow()
	})
})

describe('CallableChainable routes object', () => {	
	const routesObject = new NamedRoutes(routesNoSlashes)
	const routes = routesObject.routes

	test('calling each chainable path property with parameters returns full path', () => {
		expect( routes()                                               ).toEqual('/')
		expect( routes.users({})                                       ).toEqual('/users')
		expect( routes.users.user({ userId: 1 })                       ).toEqual('/users/1')
		expect( routes.users.user.edit({ userId: 1 })                  ).toEqual('/users/1/edit')
		expect( routes.users.user.lists({ userId: 1 })                 ).toEqual('/users/1/lists')
		expect( routes.users.user.lists.list({ userId: 1, listId: 1 }) ).toEqual('/users/1/lists/1')
		expect( routes.events()                                        ).toEqual('/events')
		expect( routes.events.event({ eventId: 1 })                    ).toEqual('/events/1')
	})

	test('calling each chainable routes property with no parameters returns route definition', () => {
		expect( routes.users()                 ).toEqual('/users')
		expect( routes.users.user()            ).toEqual('/users/:userId')
		expect( routes.users.user.edit()       ).toEqual('/users/:userId/edit')
		expect( routes.users.user.lists()      ).toEqual('/users/:userId/lists')
		expect( routes.users.user.lists.list() ).toEqual('/users/:userId/lists/:listId')
		expect( routes.events()                ).toEqual('/events')
		expect( routes.events.event()          ).toEqual('/events/:eventId')
	})
})

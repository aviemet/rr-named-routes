import { route } from './route'
import { pathsToCallableProxy } from './callableChainable'
import { routesNoSlashes } from './route.mock'

describe('CallableChainable', () => {
	const path = pathsToCallableProxy(route('', routesNoSlashes))
	
	test('calling each chainable path property with parameters returns full path', () => {
		expect(path()).toEqual('/')
		expect(path.users({})).toEqual('/users')
		expect(path.users.user({ userId: 1 })).toEqual('/users/1')
		expect(path.users.user.edit({ userId: 1 })).toEqual('/users/1/edit')
		expect(path.users.user.lists({ userId: 1 })).toEqual('/users/1/lists')
		expect(path.users.user.lists.list({ userId: 1, listId: 1 })).toEqual('/users/1/lists/1')
	})

	test('calling each chainable path property with no parameters returns route definition', () => {
		expect(path.users()).toEqual('/users')
		expect(path.users.user()).toEqual('/users/:userId')
		expect(path.users.user.edit()).toEqual('/users/:userId/edit')
		expect(path.users.user.lists()).toEqual('/users/:userId/lists')
		expect(path.users.user.lists.list()).toEqual('/users/:userId/lists/:listId')
	})
})

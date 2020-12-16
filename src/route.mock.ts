import { nested } from './nested'

export const routesNoSlashes = nested('', {
	users: nested('users', {
		user: nested(':userId', {
			edit: 'edit',
			lists: nested('lists', {
				list: ':listId'
			})
		})
	})
})
/*
export const routesAllSlashes = nested('/', {
	users: nested('/users', {
		user: nested('/:userId', {
			edit: '/edit',
			lists: nested('/lists', {
				list: '/:listId'
			})
		})
	})
})

export const routesSomeSlashes = nested('/', {
	users: nested('/users', {
		user: nested(':userId', {
			edit: '/edit',
			lists: nested('lists', {
				list: ':listId'
			})
		})
	})
})

export const routesWithBase = nested('/admin', {
	users: nested('users', {
		user: nested(':userId', {
			edit: 'edit',
			lists: nested('lists', {
				list: ':listId'
			})
		})
	})
})

export const routesNotNested = {
	users: nested('users', {
		user: nested(':userId', {
			edit: 'edit',
			lists: nested('lists', {
				list: ':listId'
			})
		})
	})
}
*/
export const routesResults = {
	__index__: '/',
	users: {
		__index__: '/users',
		user: {
			__index__: '/users/:userId',
			edit: {
				__index__: '/users/:userId/edit'
			},
			lists: {
				__index__: '/users/:userId/lists',
				list: {
					__index__: '/users/:userId/lists/:listId'
				}
			}
		}
	}
}
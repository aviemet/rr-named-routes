import { route } from './route'

export const routesNoSlashes = route('', {
	users: route('users', {
		user: route(':userId', {
			edit: 'edit',
			lists: route('lists', {
				list: ':listId'
			})
		})
	})
})

export const routesAllSlashes = route('/', {
	users: route('/users', {
		user: route('/:userId', {
			edit: '/edit',
			lists: route('/lists', {
				list: '/:listId'
			})
		})
	})
})

export const routesSomeSlashes = route('/', {
	users: route('/users', {
		user: route(':userId', {
			edit: '/edit',
			lists: route('lists', {
				list: ':listId'
			})
		})
	})
})

export const routesWithBase = route('/admin', {
	users: route('users', {
		user: route(':userId', {
			edit: 'edit',
			lists: route('lists', {
				list: ':listId'
			})
		})
	})
})

export const routesNotRouted = {
	users: route('users', {
		user: route(':userId', {
			edit: 'edit',
			lists: route('lists', {
				list: ':listId'
			})
		})
	})
}

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


export const adminRoutesResults = {
	__index__: '/admin/',
	users: {
		__index__: '/admin/users',
		user: {
			__index__: '/admin/users/:userId',
			edit: {
				__index__: '/admin/users/:userId/edit'
			},
			lists: {
				__index__: '/admin/users/:userId/lists',
				list: {
					__index__: '/admin/users/:userId/lists/:listId'
				}
			}
		}
	}
}
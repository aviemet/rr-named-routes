import { nested } from './nested'

export const routesNoSlashes = nested('', {
	users: nested('users', {
		user: nested(':userId', {
			edit: 'edit',
			accounts: nested('accounts', {
				account: ':accountId'
			})
		})
	})
})
/*
export const routesAllSlashes = nested('/', {
	users: nested('/users', {
		user: nested('/:userId', {
			edit: '/edit',
			accounts: nested('/accounts', {
				account: '/:accountId'
			})
		})
	})
})

export const routesSomeSlashes = nested('/', {
	users: nested('/users', {
		user: nested(':userId', {
			edit: '/edit',
			accounts: nested('accounts', {
				account: ':accountId'
			})
		})
	})
})

export const routesWithBase = nested('/admin', {
	users: nested('users', {
		user: nested(':userId', {
			edit: 'edit',
			accounts: nested('accounts', {
				account: ':accountId'
			})
		})
	})
})

export const routesNotNested = {
	users: nested('users', {
		user: nested(':userId', {
			edit: 'edit',
			accounts: nested('accounts', {
				account: ':accountId'
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
			accounts: {
				__index__: '/users/:userId/accounts',
				account: {
					__index__: '/users/:userId/accounts/:accountId'
				}
			}
		}
	}
}
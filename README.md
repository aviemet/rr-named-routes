# rr-named-routes

A small library for creating named routes for React Router.

## How to use

First, define your routes, each beginning with a forward slash. Use the `nested` function to define nested routes:

```javascript
import { nested } from 'rr-named-routes'

export default routes = nested('', {
  users: nested('users', {
    user: nested(':userId', {
      edit: 'edit',
      lists: nested('lists', {
        list: ':listId'
      })
    })
  })
})
```

This creates the following routes:

```
/
/users
/users/:userId
/users/:userId/edit
/users/:userId/lists
/users/:userId/lists/:listId
```

Next wrap your app in the context provider

```javascript
import { NamedRoutesProvider } from 'rr-named-routes'
import routes from './routes'

const App = () => {
  <NamedRoutesProvider routes={ routes }>
    { children } // <-- Rest of the app....
  </NamedRoutesProvider>
}

```

Now your routes are available as a hook in any component. Nested routes can be chained, then called as a method with no parameters when defining a route.

```javascript
import { Router, Route } from 'react-router-dom'
import { useNamedRoutes } from 'rr-named-routes'
...

const AppRoutes = () => {
  const routes = useNamedRoutes()

  return (
    <>
      <Router>
        <Route path={ routes.() } component={ HomeComponent } /> // "/"

        <Route path={ routes.users() } component={ ListUsersComponent } /> // "/users"

        <Route path={ routes.users.user() } component={ ShowUserComponent } /> // "/users/:userId"

        <Route path={ routes.users.user.lists.list() } component={ UserListComponent } /> // "/users/:userId/lists/:listId"
      </Router>
    </>
  )
}

```

In any component, you can create a link:

```javascript
import { Link } from 'react-router-dom'
import { useNamedRoutes } from 'rr-named-routes'

const SomeComponent = () => {
  const routes = useNamedRoutes()

  return (
    <>
      <Link to={ routes() }>Home</Link> // "/"

      <Link to={ routes.users() }>All Users</Link> // "/users"

      <Link to={ routes.users.user({ userId: 1 }) }>Specific User</Link> // "/users/1"

      <Link to={ outes.users.user.lists.list({ userId: 1, listId: 2 }) }>Specific User</Link> // "/users/1/lists/2"
    </>
  )
}

```

## Details

Link generation uses React Router's `generatePath` method to preserve error messages.

## Planned Updates

* Add the ability to ignore an index. For instance, if you wanted to have routes nested under "/settings", but didn't want an endpoint at "/settings".
  * Syntax should be `{ __index__: false }`

* Add a utility method which can be called in the command line via npm/npx which will print a list of the defined routes.

* Accept a nested routes definition with '/' at the beginning or end of the routes

* Allow adding query string parameters
  * Define them on each route, but only have them added if the parameters are passed in. Must be stripped if a nested route is accessed

  * Should be able to accept arbitrary extra params which get appended as query strings in addition to being able to define them in the route definition. For instance, if `{ path: 'route?search=:search' }` was defined, and a params object was passed as such: `{ search: 'search_value', extra: 'something }`, it should produce `"/route?search=search_value&extra=something"`

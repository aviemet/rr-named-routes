# react-named-routes

A small library for creating named routes for React Router. Uses Proxy to create a clean interface for defining and referencing routes.

## How to use

First, define your routes, each beginning with a forward slash. Use the `nested` function to define nested routes:

```javascript
import { nested } from "react-named-rotues"

export default routes = {
  login: "/login",
  users: nested("/users", {
    show: "/:id"
  })
}
```

Next wrap your app in the context provider

```javascript
import { NamedRoutesProvider } from 'react-named-routes'

const App = () => {
  <NamedRoutesProvider>
    { children } // <-- Rest of the app....
  </NamedRoutesProvider>
}

```

Now your routes are available as a hook in any component. Nested routes can be chained, then called as a method for the string value of the route.

```javascript
import { Router, Route } from 'react-router-dom'
import { useNamedRoutes } from 'react-named-routes'
...


const AppRoutes = () => {
  const routes = useNamedRoutes()

  return (
    <>
      <Router>
        <Route path={ routes.login() } component={ LoginComponent } /> // "/login"

        <Route path={ routes.users() } component={ DisplayUsersComponent } /> // "/users"

        <Route path={ routes.users.show() } component={ UserComponent } /> // "/users/:id"
      </Router>
    </>
  )
}

```

In any component, you can create a link:

```javascript
import { Link } from 'react-router-dom'
import { useNamedRoutes } from 'react-named-routes'

const SomeComponent = () => {
  const routes = useNamedRoutes()

  return (
    <>
      <Link to={ routes.login() }>Login</Link> // "/login"

      <Link to={ routes.users() }>All Users</Link> // "/users"

      <Link to={ routes.users.show({ id: 1 }) }>Specific User</Link> // "/users/1"
    </>
  )
}

```

## Details

Link generation uses React Router's `generatePath` method to preserve error messages.

## Planned Updates

* Add the ability to ignore an index. For instance, if you wanted to have routes nested under "/settings", but didn't want an endpoint at "/settings".

* Add a utility method which can be called in the command line via npm/npx which will print a list of the defined routes.
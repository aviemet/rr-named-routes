import * as React from 'react'
import { route, deepNestedObject } from './route'
import { NamedRoutes } from './namedRoutes'
import { CallableChainable } from './callableChainable';

export { route, NamedRoutes }

/**
 * Hook for using named routes in a react-router project
 * @param routes routes object
 */
export const NamedRouteContext = React.createContext<CallableChainable | undefined>(undefined)
export const useNamedRoutes = () => React.useContext(NamedRouteContext)

export const NamedRoutesProvider: React.FC<{routes: deepNestedObject<string>, children: any}> = ({ routes, children }) => {
	
	let memoizedRoutes = React.useMemo(() => {
		return new NamedRoutes(routes).routes
	}, [routes])
	
	return (
		<NamedRouteContext.Provider value={ memoizedRoutes }>
			{ children }
		</NamedRouteContext.Provider>
	)
}

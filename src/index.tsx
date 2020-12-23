import * as React from 'react'
import { route } from './route'
import { pathsToCallableProxy } from './callableChainable'

export { route }

export const INDEX = '__index__'

type NamedRoutesHookObject = {[key: string]: any}

/**
 * Hook for using named routes in a react-router project
 * @param routes routes object
 */
const NamedRouteContext = React.createContext<NamedRoutesHookObject>({})
export const useNamedRoutes = () => React.useContext(NamedRouteContext)

export const NamedRoutesProvider: React.FC<{routes: object, children: any}> = ({ routes, children }) => {
	
	let memoizedRoutes = React.useMemo(() => {
		return pathsToCallableProxy(route('', routes))
	}, [routes])
	
	return (
		<NamedRouteContext.Provider value={ memoizedRoutes }>
			{ children }
		</NamedRouteContext.Provider>
	)
}

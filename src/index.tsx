import * as React from 'react'
import { nested } from './nested'
import { pathsToCallableProxy } from './callableChainable'

export const INDEX = '__index__'

type NamedRoutesHookObject = {[key: string]: any}

/**
 * Hook for using named routes in a react-router project
 * @param routes routes object
 */
const NamedRouteContext = React.createContext<NamedRoutesHookObject>({})
export const useNamedRoutes = () => React.useContext(NamedRouteContext)

export const NamedRoutesProvider: React.FC<{value: object, children: any}> = ({ value, children }) => {
	
	let memoizedRoutes = React.useMemo(() => {
		return pathsToCallableProxy(nested('', value))
	}, [value])
	
	return (
		<NamedRouteContext.Provider value={ memoizedRoutes }>
			{ children }
		</NamedRouteContext.Provider>
	)
}

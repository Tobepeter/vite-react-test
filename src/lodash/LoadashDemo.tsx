import { lodashThrottle } from './LodThrottle'

export const LoadashDemo = () => {
  useEffect(() => {
    lodashThrottle.init()
  }, [])

  return <div>LoadashDemo</div>
}

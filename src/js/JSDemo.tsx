import { chromeMod } from './chrome-mod'
import { LockOrientationDemo } from './lock-orientation/LockOrientationDemo'
import { PerformanceDemo } from './perpormance/PerformanceDemo'

export const JSDemo = () => {
  useEffect(() => {
    console.log('JSDemo')

    chromeMod.init()
  }, [])

  return <div>JSDemo</div>
  // return <PerformanceDemo />
  // return <LockOrientationDemo />
}

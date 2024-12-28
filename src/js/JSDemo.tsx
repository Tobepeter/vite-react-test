import { chromeModjs } from './chrome-mod/chrome-mod-js'
import { ChromeMod } from './chrome-mod/ChromeMod'
import { LockOrientationDemo } from './lock-orientation/LockOrientationDemo'
import { PerformanceDemo } from './perpormance/PerformanceDemo'

export const JSDemo = () => {
  // return <PerformanceDemo />
  // return <LockOrientationDemo />
  return <ChromeMod />
}

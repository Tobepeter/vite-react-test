import { chromeModjs } from './chrome-mod/chrome-mod-js'
import { ChromeMod } from './chrome-mod/ChromeMod'
import { ConsoleDemo } from './console-test/ConsoleDemo'
import { consoleTable } from './console-test/ConsoleTable'
import { LockOrientationDemo } from './lock-orientation/LockOrientationDemo'
import { PerformanceDemo } from './perpormance/PerformanceDemo'
import { MobileDemo } from './mobile/MobileDemo'
import { TimerDemo } from './timer/TimerDemo'
import { JSFetchDemo } from './fetch/JSFetchDemo'

export const JSDemo = () => {
  // return <PerformanceDemo />
  // return <LockOrientationDemo />
  // return <ChromeMod />
  // return <ConsoleDemo />
  // return <MobileDemo />
  // return <TimerDemo />
  return <JSFetchDemo />
}

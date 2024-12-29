import { chromeModjs } from './chrome-mod/chrome-mod-js'
import { ChromeMod } from './chrome-mod/ChromeMod'
import { ConsoleDemo } from './console-test/ConsoleDemo'
import { consoleTable } from './console-test/ConsoleTable'
import { LockOrientationDemo } from './lock-orientation/LockOrientationDemo'
import { PerformanceDemo } from './perpormance/PerformanceDemo'

export const JSDemo = () => {
  // return <PerformanceDemo />
  // return <LockOrientationDemo />
  // return <ChromeMod />
  return <ConsoleDemo />
}

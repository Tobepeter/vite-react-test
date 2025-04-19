import Tempus from 'tempus'
import { useEffect } from 'react'

/**
 * raf的代码
 *
 * @docs https://github.com/darkroomengineering/tempus
 *
 * 类似
 * [raf-manager](https://www.npmjs.com/package/raf-manager)
 */
export const TempusDemo = () => {
  useEffect(() => {
    let unsubscribe: () => void
    function animate(time: number, deltaTime: number) {
      console.log('frame', time, deltaTime)
      if (time > 1000) {
        unsubscribe?.()
      }
    }
    unsubscribe = Tempus.add(animate)
    return () => {
      unsubscribe?.()
    }
  }, [])

  return <div>Tempus Demo</div>
}

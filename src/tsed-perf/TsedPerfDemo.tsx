import { useEffect } from 'react'
import { PerfLogger } from '@tsed/perf'

export const TsedPerfDemo = () => {
  const test = () => {
    const { wrap, start, end, bind, log } = PerfLogger.get('mylogger')

    // bind all class methods

    class MyClass {
      doSomething1() {}
      doSomething2() {}
    }

    const instance = bind(new MyClass())

    start() // log nothing this line is commented

    instance.doSomething1()
    instance.doSomething2()

    end()
  }

  useEffect(() => {
    test()
  }, [])

  return <div>TsedPerfDemo</div>
}

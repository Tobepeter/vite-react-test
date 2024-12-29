import { consoleTable } from './ConsoleTable'
import { consoleGroup } from './ConsoleGroup'
import { consoleCount } from './ConsoleCount'

export const ConsoleDemo = () => {
  useEffect(() => {
    // consoleTable.init()
    // consoleGroup.init()
    // consoleCount.init()

    const obj = {}
    // @ts-ignore
    console.log(obj.a.b)
  }, [])

  return <div>ConsoleDemo</div>
}

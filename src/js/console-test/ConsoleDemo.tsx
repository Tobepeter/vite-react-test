import { consoleTable } from './ConsoleTable'
import { consoleGroup } from './ConsoleGroup'
import { consoleCount } from './ConsoleCount'
import { consoleStyle } from './ConsoleStyle'

export const ConsoleDemo = () => {
  useEffect(() => {
    // consoleTable.init()
    // consoleGroup.init()
    // consoleCount.init()
    consoleStyle.init()
  }, [])

  return <div>ConsoleDemo</div>
}

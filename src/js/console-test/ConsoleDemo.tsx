import { consoleTable } from './ConsoleTable'
import { consoleGroup } from './ConsoleGroup'
import { consoleCount } from './ConsoleCount'

export const ConsoleDemo = () => {
  useEffect(() => {
    // consoleTable.init()
    // consoleGroup.init()
    consoleCount.init()
  }, [])

  return <div>ConsoleDemo</div>
}

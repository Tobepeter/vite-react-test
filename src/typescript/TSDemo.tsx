import { TSDecoOrderTest } from './demo/TSDecoOrder'
import { TSGetSet } from './demo/TSGetSet'

export const TSDemo = () => {
  useEffect(() => {
    // TSDecoOrderTest()
    TSGetSet()
  }, [])

  return <div>TSDemo</div>
}

import { storageTest } from './StorageTest'
import { decorateTest } from './DecorateTest'

export const UtilTest = () => {
  useEffect(() => {
    storageTest.init()
    // decorateTest.init()
  }, [])

  return <div>UtilTest</div>
}

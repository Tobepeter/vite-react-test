import { chromeModjs } from './chrome-mod-js'
import { ChromeModCSS } from './chrome-mod-css'

export const ChromeMod = () => {
  useEffect(() => {
    chromeModjs.init()
  }, [])

  // return <div>ChromeMod</div>
  return <ChromeModCSS />
}

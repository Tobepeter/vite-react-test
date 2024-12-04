import { AhooksDemo } from './ahooks/AhooksDemo'
import { CanvasDemo } from './canvas/CanvasDemo'
import { TailwindDemo } from './css/tailwind/TailwindDemo'
import { GsapTest } from './gsap/GsapTest'
import { HtmlDemo } from './html/HtmlDemo'
import { PerformanceDemo } from './js/perpormance/PerformanceDemo'
import { PerformanceSimple } from './js/perpormance/PerformanceSimple'
import { PixiDemo } from './pixi/PixiDemo'
import { SwiperDemo } from './swiper/SwiperDemo'
import { UseHotKeyDemo } from './use-hot-keys/UseHotKeyDemo'
import { debugUtil } from './utils/DebugUtil'
import { globalUtil } from './utils/GlobalUtil'
import { ViteTest } from './vite-test/ViteTest'

globalUtil.init()
debugUtil.init()

function Test() {
  // return <div>Test</div>
  // return <SwiperDemo />
  // return <GsapTest />
  // return <PixiDemo />
  // return <DatGUITest />
  // return <LevaTest />
  // return <TweakpaneTest />
  // return <ViteTest />
  // return <UseHotKeyDemo />
  // return <AhooksDemo />
  // return <CanvasDemo />
  return <HtmlDemo />
  // return <TailwindDemo />
  // return <PerformanceDemo />
}

function App() {
  return <Test />
}

export default App

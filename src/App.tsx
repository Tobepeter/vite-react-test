import { AhooksDemo } from './ahooks/AhooksDemo'
import { CanvasDemo } from './canvas/CanvasDemo'
import { TailwindDemo } from './css/tailwind/TailwindDemo'
import { GsapDemo } from './gsap/GsapDemo'
import { HtmlDemo } from './html/HtmlDemo'
import { JSDemo } from './js/JSDemo'
import { PerformanceDemo } from './js/perpormance/PerformanceDemo'
import { PerformanceSimple } from './js/perpormance/PerformanceSimple'
import { LoadashDemo } from './lodash/LoadashDemo'
import { MittDemo } from './mitt/MittDemo'
import { PixiDemo } from './pixi/PixiDemo'
import { ReactDemo } from './react/ReactDemo'
import { SwiperDemo } from './swiper/SwiperDemo'
import { ThreeDemo } from './three/ThreeDemo'
import { TSDemo } from './typescript/TSDemo'
import { AntdDemo } from './ui/antd/AntdDemo'
import { ShadcnDemo } from './ui/shadcn/ShadcnDemo'
import { UseHotKeyDemo } from './use-hot-keys/UseHotKeyDemo'
import { debugUtil } from './utils/DebugUtil'
import { decorate, inject, monitorLog } from './utils/deco/Decorate'
import { globalUtil } from './utils/GlobalUtil'
import { storage } from './utils/Storage'
import { UtilTest } from './utils/test/UtilTest'
import { ViteTest } from './vite-test/ViteTest'
import { WebGLDemo } from './webgl/WebGLDemo'

globalUtil.init()
debugUtil.init()

function Test() {
  // return <div>Test</div>
  // return <SwiperDemo />
  return <GsapDemo />
  // return <PixiDemo />
  // return <ThreeDemo />
  // return <DatGUITest />
  // return <LevaTest />
  // return <TweakpaneTest />
  // return <ViteTest />
  // return <UseHotKeyDemo />
  // return <AhooksDemo />
  // return <CanvasDemo />
  // return <HtmlDemo />
  // return <TailwindDemo />
  // return <JSDemo />
  // return <ReactDemo />
  // return <ShadcnDemo />
  // return <AntdDemo />
  // return <TSDemo />
  // return <UtilTest />
  // return <LoadashDemo />
  // return <MittDemo />
}

function App() {
  return <Test />
}

export default App

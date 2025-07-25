import { AhooksDemo } from './ahooks/AhooksDemo'
import { CanvasDemo } from './canvas/CanvasDemo'
import { CSSDemo } from './css/demo/CSSDemo'
import { StyledCompDemo } from './css/styled-comp/StyledCompDemo'
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
import { ZustandDemo } from './zustand/ZustandDemo'
import { ComponentDemo } from './components/ComponentDemo'
import { SafeAreaInsetsDemo } from './safe-area-insets/SafeAreaInsetsDemo'
import { AlgorithmDemo } from './algorithm/AlgorithmDemo'
import { ScssDemo } from './css/scss/ScssDemo'
import { LessDemo } from './css/less/LessDemo'
import { TsedPerfDemo } from './tsed-perf/TsedPerfDemo'
import { MermaidDemo } from './mermaid/MermaidDemo'
import { LibDebugDemo } from './lib-debug/LibDebugDemo'
import { OpenEditor } from './open-editor/OpenEditor'
import { TempusDemo } from './tempus/TempusDemo'
import { PerfDemo } from './perf/PerfDemo'
import { MotionDemo } from './motion/MotionDemo'
import { MockJSDemo } from './mockjs/MockJSDemo'
import { DataVisualDemo } from './data-visual/DataVisualDemo'

globalUtil.init()
debugUtil.init()

function Test() {
  // return <SwiperDemo />
  // return <GsapDemo />
  // return <PixiDemo />
  // return <ThreeDemo />
  // return <DatGUITest />
  // return <LevaTest />
  // return <TweakpaneTest />
  // return <ViteTest />
  // return <UseHotKeyDemo />
  // return <AhooksDemo />
  // return <CanvasDemo />
  // return <ComponentDemo />
  // return <HtmlDemo />
  // return <CSSDemo />
  // return <StyledCompDemo />
  // return <TailwindDemo />
  // return <ScssDemo />
  // return <LessDemo />
  // return <JSDemo />
  // return <ReactDemo />
  // return <ShadcnDemo />
  // return <AntdDemo />
  // return <TSDemo />
  // return <UtilTest />
  // return <LoadashDemo />
  // return <MittDemo />
  // return <ZustandDemo />
  // return <SafeAreaInsetsDemo />
  // return <AlgorithmDemo />
  // return <MermaidDemo />
  // return <LibDebugDemo />
  // return <OpenEditor />
  // return <TempusDemo />
  // return <PerfDemo />
  // return <MotionDemo />
  // return <MockJSDemo />
  return <DataVisualDemo />
}

function App() {
  return <Test />
}

export default App

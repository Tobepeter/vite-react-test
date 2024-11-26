import { GsapTest } from './gsap/GsapTest';
import { PixiDemo } from './pixi/PixiDemo';
import { SwiperTest } from './swiper/SwiperTest';
import { debugUtil } from './utils/DebugUtil';
import { globalUtil } from './utils/GlobalUtil';
import { ViteTest } from './vite-test/ViteTest';

globalUtil.init();
debugUtil.init();

function Test() {
  // return <div>Test</div>;
  // return <SwiperTest />;
  return <GsapTest />;
  // return <PixiDemo />;
  // return <DatGUITest />;
  // return <LevaTest />;
  // return <TweakpaneTest />;
  // return <ViteTest />;
}

function App() {
  return <Test />;
}

export default App;

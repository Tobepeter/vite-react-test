import { AhooksDemo } from './ahooks/AhooksDemo';
import { GsapTest } from './gsap/GsapTest';
import { PixiDemo } from './pixi/PixiDemo';
import { SwiperDemo } from './swiper/SwiperDemo';
import { UseHotKeyDemo } from './use-hot-keys/UseHotKeyDemo';
import { debugUtil } from './utils/DebugUtil';
import { globalUtil } from './utils/GlobalUtil';
import { ViteTest } from './vite-test/ViteTest';

globalUtil.init();
debugUtil.init();

function Test() {
  // return <div>Test</div>;
  return <SwiperDemo />;
  // return <GsapTest />;
  // return <PixiDemo />;
  // return <DatGUITest />;
  // return <LevaTest />;
  // return <TweakpaneTest />;
  // return <ViteTest />;
  // return <UseHotKeyDemo />;
  // return <AhooksDemo />;
}

function App() {
  return <Test />;
}

export default App;

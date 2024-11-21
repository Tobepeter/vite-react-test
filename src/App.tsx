import { GsapTest } from './gsap/GsapTest';
import { PixiTest } from './pixi/PixiTest';
import { DatGUITest } from './dat-gui/DatGUITest';
import { SwiperTest } from './swiper/SwiperTest';
import { debugUtil } from './utils/DebugUtil';
import { globalUtil } from './utils/GlobalUtil';

globalUtil.init();
debugUtil.init();

function Test() {
  // return <div>Test</div>;
  // return <SwiperTest />;
  // return <GsapTest />;
  // return <PixiTest />;
  return <DatGUITest />;
}

function App() {
  return <Test />;
}

export default App;

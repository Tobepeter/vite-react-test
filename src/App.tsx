import { GsapTest } from './gsap/GsapTest';
import { PixiTest } from './pixi/PixiTest';
import { DatGUITest } from './dat-gui/DatGUITest';
import { SwiperTest } from './swiper/SwiperTest';
import { debugUtil } from './utils/DebugUtil';
import { globalUtil } from './utils/GlobalUtil';
import { LevaTest } from './leva/LevaTest';
import { TweakpaneTest } from './tweakpane/TweakPaneTest';

globalUtil.init();
debugUtil.init();

function Test() {
  // return <div>Test</div>;
  // return <SwiperTest />;
  // return <GsapTest />;
  // return <PixiTest />;
  // return <DatGUITest />;
  // return <LevaTest />;
  return <TweakpaneTest />;
}

function App() {
  return <Test />;
}

export default App;

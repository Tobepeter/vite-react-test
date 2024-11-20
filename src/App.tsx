import { GsapTest } from './gsap/GsapTest';
import { SwiperTest } from './swiper/SwiperTest';
import { debugUtil } from './utils/DebugUtil';
import { globalUtil } from './utils/GlobalUtil';

globalUtil.init();
debugUtil.init();

function Test() {
  // return <div>Test</div>;
  // return <SwiperTest />;
  return <GsapTest />;
}

function App() {
  return <Test />;
}

export default App;

import { debugUtil } from "./utils/DebugUtil";
import { globalUtil } from "./utils/GlobalUtil";

globalUtil.init();
debugUtil.init();

function Test() {
  return <div>Test</div>;
}

function App() {
  return <Test />;
}

export default App;

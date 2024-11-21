import { GUI } from 'dat.gui';

export const DatGUIRemember = () => {
  const [params, setParams] = useState({
    count: 0,
    text: 'Hello',
  });

  useEffect(() => {
    const gui = new GUI();
    const params = {
      count: 50,
      text: 'hello',
      // callback: () => {
      //   console.log(gui.getSaveObject());
      // },
    };

    gui.add(params, 'count', 0, 100).onChange((value) => {
      setParams((prev) => ({ ...prev, count: value }));
    });

    gui.add(params, 'text').onChange((value) => {
      setParams((prev) => ({ ...prev, text: value }));
    });

    // NOTE: 注意，虽然用起来有点别扭，即使是callback也需要包裹为一个对象上的属性，这是因为add的api设计导致的
    // gui.add(params, 'callback');

    // NOTE: 我感觉实际上也也没有记录在localStorage，只是方便类似undo一个数据而已
    gui.remember(params);

    return () => {
      gui.destroy();
    };
  }, []);

  return (
    <div>
      <div>count: {params.count}</div>
      <div>text: {params.text}</div>
    </div>
  );
};

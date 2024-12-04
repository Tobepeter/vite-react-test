export const PerformanceSimple = () => {
  const [autoRun, setAutoRun] = useState(true);

  /**
   * 密集数学运算
   * @desc 使用三角函数和平方根进行大量计算。这些数学运算本身就比较耗费CPU。
   * @desc count 最好不要超过 1e5
   */
  const matchCalc = (count: number) => {
    let result = 0;
    for (let i = 0; i < count; i++) {
      result += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
    }
    return result;
  };

  const bigArrayOperate = (count: number) => {
    const arr = new Array(count).fill(0);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random();
    }
  };

  const doHeavyWork = () => {
    const count = 1e8;
    matchCalc(count);
    // bigArrayOperate(count);
  };

  useEffect(() => {
    if (!autoRun) return;
    let timer = -1;
    console.log('开始执行复杂代码');
    const loop = () => {
      doHeavyWork();
      timer = requestAnimationFrame(loop);
    };
    timer = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(timer);
    };
  }, [autoRun]);

  return (
    <div>
      <div className="flex justify-end items-end flex-col">
        <button onClick={doHeavyWork}>Click me</button>
        <div>
          <input
            type="checkbox"
            defaultChecked={autoRun}
            onChange={(e) => setAutoRun(e.target.checked)}
          />
          <label>自动运行</label>
        </div>
      </div>

      {/* 添加内联样式的动画 */}
      <div
        className="w-10 h-10 absolute top-1/2 rounded-full bg-red-500"
        style={{
          animation: 'moveLeftRight 2s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes moveLeftRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(calc(100vw - 2.5rem)); }
        }
      `}</style>
    </div>
  );
};

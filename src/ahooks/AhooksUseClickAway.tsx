import { useClickAway } from 'ahooks';

export const AhooksUseClickAway = () => {
  const ref = useRef(null);
  useClickAway(() => {
    // NOTE: 当传递了 [] 时，只要点击页面任意位置都会触发
    console.log('点击了 []');
  }, []);

  useClickAway(() => {
    console.log('点击了 [ref]');
  }, [ref]);

  return <div ref={ref}>AhooksUseClickAway</div>;
};

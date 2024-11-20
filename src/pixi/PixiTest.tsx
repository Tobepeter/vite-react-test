import { pixiEntry } from './PixiEntry';

export const PixiTest = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pixiEntry.isInited) {
      pixiEntry.init();
    }
    rootRef.current!.appendChild(pixiEntry.canvas);
  }, []);

  return <div ref={rootRef} id="pixi-root"></div>;
};

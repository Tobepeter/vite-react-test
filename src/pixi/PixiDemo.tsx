import { pixiEntry } from './PixiEntry'

export const PixiDemo = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pixiEntry.isInited) {
      pixiEntry.init()
    }
    rootRef.current!.appendChild(pixiEntry.canvas)
  }, [])

  return <div ref={rootRef} id="pixi-root"></div>
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    pixiEntry.destroy()
  })
}

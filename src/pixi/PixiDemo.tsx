import { pixiEntry } from './PixiEntry'
import { PixiDomHandle, PixiDomUtil } from './util/dom/PixiDomUtil'

export const PixiDemo = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<PixiDomHandle>(null)

  useEffect(() => {
    pixiEntry.domHandle = handleRef.current

    if (!pixiEntry.isInited) {
      pixiEntry.init()
    }

    rootRef.current!.appendChild(pixiEntry.canvas)
  }, [])

  const onDomHandle = useCallback((handle: PixiDomHandle) => {
    handleRef.current = handle
  }, [])

  return (
    <div>
      <div ref={rootRef} id='pixi-root'></div>
      <PixiDomUtil onHandle={onDomHandle} />
    </div>
  )
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    pixiEntry.destroy()
  })
}

import { webGLEntry } from './WebGLEntry'
import { webGLTriangle } from './demo/WebGLTriangle'

export const WebGLDemo = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!webGLEntry.isInited) {
      webGLEntry.init()
    }
    rootRef.current?.appendChild(webGLEntry.canvas)
  }, [])
  return <div ref={rootRef}></div>
}

// not support hmr now
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload()
  })
}

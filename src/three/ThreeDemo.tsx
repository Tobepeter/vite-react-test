import { threeEntry } from './ThreeEntry'

export const ThreeDemo = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!threeEntry.isInited) {
      threeEntry.init()
    }
    rootRef.current!.appendChild(threeEntry.canvas)
  }, [])

  return <div ref={rootRef} id="three-root"></div>
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    threeEntry.destroy()
  })
}

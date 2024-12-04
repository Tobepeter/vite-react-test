export const TweakpaneCdnV3 = () => {
  const containerRef = useRef(null)
  const [color, setColor] = useState('#ff0000')
  const [size, setSize] = useState(100)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    // 使用 CDN 引入 Tweakpane
    const script = document.createElement('script')
    script.src =
      'https://cdn.jsdelivr.net/npm/tweakpane@3.1.0/dist/tweakpane.min.js'
    script.async = true

    script.onload = () => {
      const Tweakpane = win.Tweakpane
      const pane = new Tweakpane.Pane({
        container: containerRef.current,
      })

      // 添加颜色控制
      pane.addInput({ color }, 'color').on('change', (ev) => {
        setColor(ev.value)
      })

      // 添加大小控制
      pane
        .addInput({ size }, 'size', { min: 50, max: 200 })
        .on('change', (ev) => {
          setSize(ev.value)
        })

      // 添加位置控制
      pane
        .addInput({ position }, 'position', {
          x: { min: 0, max: 300 },
          y: { min: 0, max: 300 },
        })
        .on('change', (ev) => {
          setPosition(ev.value)
        })

      // 添加旋转控制
      pane
        .addInput({ rotation }, 'rotation', {
          min: 0,
          max: 360,
        })
        .on('change', (ev) => {
          setRotation(ev.value)
        })
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="flex min-h-screen">
      <div ref={containerRef} className="w-64" />
      <div className="flex-1 flex items-center justify-center">
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
            position: 'absolute',
            transition: 'all 0.3s ease',
          }}
        />
      </div>
    </div>
  )
}

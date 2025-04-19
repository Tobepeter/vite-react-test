import { GUI } from 'dat.gui'

export const DatGUISimple = () => {
  const [params, setParams] = useState({
    color: '#ff0000',
    scale: 1.0,
    rotation: 0,
    stepSlider: 0.1,
    switch: true,
    dropdown: 'option1',
    text: 'hello',

    groupText1: 'groupText1',
    groupText2: 'groupText2',
  })

  const [callCount, setCallCount] = useState(0)

  const callback = () => {
    setCallCount(prev => prev + 1)
  }

  useEffect(() => {
    const gui = new GUI()

    // NOTE: 如果数据是reactive的，其实不需要onChange回调
    gui.addColor(params, 'color').onChange(value => {
      setParams(prev => ({ ...prev, color: value }))
    })

    gui.add(params, 'scale', 0.1, 2).onChange(value => {
      setParams(prev => ({ ...prev, scale: value }))
    })

    gui.add(params, 'rotation', 0, Math.PI * 2).onChange(value => {
      setParams(prev => ({ ...prev, rotation: value }))
    })

    gui
      .add(params, 'stepSlider', 0.1, 1)
      .step(0.1)
      .onChange(value => {
        setParams(prev => ({ ...prev, stepSlider: value }))
      })

    gui.add(params, 'switch').onChange(value => {
      setParams(prev => ({ ...prev, switch: value }))
    })

    gui.add(params, 'dropdown', ['option1', 'option2', 'option3']).onChange(value => {
      setParams(prev => ({ ...prev, dropdown: value }))
    })

    gui.add(params, 'text').onChange(value => {
      setParams(prev => ({ ...prev, text: value }))
    })

    // 创建一个组
    const group = gui.addFolder('Group Settings')

    group.add(params, 'groupText1').onChange(value => {
      setParams(prev => ({ ...prev, groupText1: value }))
    })

    group.add(params, 'groupText2').onChange(value => {
      setParams(prev => ({ ...prev, groupText2: value }))
    })

    // 默认展开组
    group.open()

    gui.add({ callback }, 'callback')

    return () => {
      gui.destroy()
    }
  }, []) // 注意：这里移除了 params 依赖

  return (
    <div>
      {/* 颜色   */}
      <div style={{ color: params.color }}>color</div>

      {/* 缩放 */}
      <div>
        <div
          style={{
            transform: `scale(${params.scale})`,
            transformOrigin: 'center center',
            display: 'inline-block',
          }}
        >
          scale
        </div>
      </div>

      {/* 旋转 */}
      <div>
        <div
          style={{
            transform: `rotate(${params.rotation}rad)`,
            transformOrigin: 'center center',
            display: 'inline-block',
          }}
        >
          rotation
        </div>
      </div>

      {/* 开关 */}
      <div>switch: {params.switch ? 'on' : 'off'}</div>

      {/* 下拉框 */}
      <div>dropdown: {params.dropdown}</div>

      {/* 文本框 */}
      <div>text: {params.text}</div>

      {/* 回调 */}
      <div>callback times: {callCount}</div>
    </div>
  )
}

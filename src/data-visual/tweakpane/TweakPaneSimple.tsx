import { Pane, TpChangeEvent } from 'tweakpane'
import { Random } from 'mockjs'

export const TweakpaneSimple = () => {
  const [params, setParams] = useState({
    x: 0,
    y: 0,
    z: 0,
    pos2D: { x: 0, y: 0 },
    // NOTE: 只有2d才支持编辑
    pos3D: { x: 0, y: 0, z: 0 },
    color: '#ff0000',
    colorRGB: { r: 1, g: 0, b: 0 },
    colorRGBA: { r: 1, g: 0, b: 0, a: 1 },
    text: 'hello',
    speed: 1,
    monitor: {
      name: 'monitor',
      count: 0,
    },
    visible: true,
  })

  useEffect(() => {
    setInterval(() => {
      setParams(prev => ({
        ...prev,
        monitor: { name: Random.name(), count: prev.monitor.count + 1 },
      }))
    }, 200)
  }, [])

  useEffect(() => {
    const pane = new Pane()

    type TpChangeValue = any
    type TpChangeTarget = any
    const onChange = (ev: TpChangeEvent<TpChangeValue, TpChangeTarget>) => {
      setParams(prev => ({ ...prev, [ev.target.key]: ev.value }))
    }

    // 为每个参数添加 onChange 回调
    pane.addBinding(params, 'x', { min: -100, max: 100 }).on('change', onChange)

    pane.addBinding(params, 'y', { min: -100, max: 100 }).on('change', onChange)

    pane.addBinding(params, 'z', { min: -100, max: 100 }).on('change', onChange)

    pane
      .addBinding(params, 'pos2D', {
        x: { min: -100, max: 100 },
        y: { min: -100, max: 100 },
      })
      .on('change', onChange)

    pane
      .addBinding(params, 'pos3D', {
        x: { min: -100, max: 100 },
        y: { min: -100, max: 100 },
        z: { min: -100, max: 100 },
      })
      .on('change', onChange)

    pane.addBinding(params, 'color').on('change', onChange)

    pane.addBinding(params, 'colorRGB').on('change', onChange)

    pane.addBinding(params, 'colorRGBA').on('change', onChange)

    pane.addBinding(params, 'text').on('change', onChange)

    pane.addBinding(params, 'speed', { min: 0, max: 10 }).on('change', onChange)

    // button
    pane.addButton({ title: 'button' }).on('click', () => {
      setParams(prev => ({ ...prev, visible: !prev.visible }))
    })

    pane.addBinding(params, 'visible').on('change', onChange)

    // TODO: not work
    //  ref: https://tweakpane.github.io/docs/monitor-bindings/#multiline
    // pane.addBinding(params, 'monitor', {
    //   readonly: true,
    //   multiline: true,
    //   rows: 5,
    // });

    return () => pane.dispose()
  }, [])

  return (
    <div>
      <h2>Tweakpane Simple Demo</h2>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  )
}

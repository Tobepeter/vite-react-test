import { useControls, button } from 'leva'

export const LevaSimple = () => {
  const [clickCount, setClickCount] = useState(0)

  const { text, count, size, color, isEnabled, position, select, image } =
    useControls(
      {
        text: 'Hello Leva',
        count: { value: 0, min: 0, max: 10, step: 1 },
        size: { value: 1.5, min: 0, max: 5, step: 0.1 },
        color: '#ff0000',
        isEnabled: true,
        position: { x: 0, y: 0, z: 0 },
        select: {
          value: 'option1',
          options: ['option1', 'option2', 'option3'],
        },
        image: { image: undefined },
        ClickMe: button(() => {
          console.log('按钮被点击了！')
          // NOTE: 这个函数是固定引用的，需要callback方式来进行更新
          setClickCount((prev) => prev + 1)
        }),
        ResetAll: button(() => {
          // 使用 set 函数重置所有控件到初始值
        }),
      },
      {
        // TODO: 下面的配置好像没用
        // NOTE: 持久化存储，会尝试读取localStorage
        persist: false,
        collapsed: true,
        label: 'Leva Simple',
        titleBar: true,
      }
    )

  return (
    <div>
      <div>{text}</div>
      <div>Count: {count}</div>
      <div>Size: {size}</div>
      <div style={{ backgroundColor: color, width: 50, height: 50 }}></div>
      <div>Enabled: {isEnabled ? 'Yes' : 'No'}</div>
      <div>
        Position: x={position.x}, y={position.y}, z={position.z}
      </div>
      <div>Selected: {select}</div>
      <img src={image} alt="image" />
      <div>Click Count: {clickCount}</div>
    </div>
  )
}

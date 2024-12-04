import { useControls, button } from 'leva'
import { Random } from 'mockjs'

export const LevaFn = () => {
  // NOTE: 使用function的方式回返回类似批量更新，类似setState
  //  非函数形式是返回直接一个对象
  const [values, set] = useControls(() => ({
    text: 'Hello Leva',
    count: { value: 0, min: 0, max: 10, step: 1 },
    ChangeText: button(() => {
      set({ text: `Hello ${Random.name()}` })
    }),
    ChangeCount: button(() => {
      set({ count: Random.integer(0, 10) })
    }),
    ChangeBoth: button(() => {
      set({ text: `Hello ${Random.name()}`, count: Random.integer(0, 10) })
    }),
  }))

  return (
    <div>
      <div>value: {values.text}</div>
      <div>count: {values.count}</div>
    </div>
  )
}

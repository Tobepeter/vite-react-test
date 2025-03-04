import { useDebounceFn, usePrevious, useUpdate } from 'ahooks'
import { Button } from 'antd'

export const AhooksUseDebounceFn = () => {
  const update = useUpdate()

  const debounceObj = useDebounceFn(
    () => {
      console.log('debounceFn')
    },
    { wait: 1000, leading: true, trailing: true }
  )

  /**
   * 引用相等测试
   * @desc 经过测试，返回的对象不想等，但是解构出来的run是相等的
   * @desc 可以使用这个 useThrottleFn 代替 lodash 的 throttle
   */
  const testEq = () => {
    if (!win.debounceObjList) {
      win.debounceObjList = []
      win.runList = []
      win.getDebounceObjListEq = () => {
        const result = []
        for (let i = 0; i < win.debounceObjList.length - 1; i++) {
          result.push(win.debounceObjList[i] === win.debounceObjList[i + 1])
        }
        return result
      }
      win.getRunListEq = () => {
        const result = []
        for (let i = 0; i < win.runList.length - 1; i++) {
          result.push(win.runList[i] === win.runList[i + 1])
        }
        return result
      }
    }
    win.debounceObjList.push(debounceObj)
    win.runList.push(debounceObj.run)
  }
  testEq()

  return (
    <div>
      <Button onClick={debounceObj.run}>debounceFn</Button>
      <Button onClick={debounceObj.cancel}>cancel</Button>
      <Button onClick={debounceObj.flush}>flush</Button>
      <Button onClick={update}>update</Button>
      <Button onClick={() => console.log(win.getDebounceObjListEq())}>getDebounceObjListEq</Button>
      <Button onClick={() => console.log(win.getRunListEq())}>getRunListEq</Button>
    </div>
  )
}

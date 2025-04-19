import { useHotkeys } from 'react-hotkeys-hook'

export const UseHotKeySimple = () => {
  const [count, setCount] = useState(0)

  // NOTE: 经过测试，useHotKeys会排除input等组件的keydown事件
  //  但是addEventListener不会排除
  useHotkeys('a', () => setCount(count => count + 1))

  useEffect(() => {
    window.addEventListener('keydown', e => {
      setCount(count => count + 1)
    })

    return () => {
      window.removeEventListener('keydown', () => {})
    }
  }, [])

  return (
    <>
      <input type='text' />
      <span>Pressed 'a' key {count} times.</span>
    </>
  )
}

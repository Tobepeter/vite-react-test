export const UseHotKeyEssential = () => {
  const [count, setCount] = useState(0)

  /**
   * 检查元素是否可编辑
   *
   * @desc useHotKey本质原理就是判断是事件的target是否是输入编辑类型的元素
   */
  function isEditable(element: HTMLElement): boolean {
    // 检查是否是可编辑元素
    if (element.isContentEditable) {
      return true
    }

    // 检查标签名和类型
    const tagName = element.tagName.toLowerCase()
    const inputType = (element as HTMLInputElement).type?.toLowerCase()

    // 排除这些可编辑元素
    const editableTags = ['input', 'textarea', 'select', 'option']

    // 排除特定类型的input
    const editableInputTypes = ['text', 'password', 'number', 'email', 'tel', 'url', 'search', 'date', 'datetime', 'datetime-local', 'time', 'month', 'week']

    return editableTags.includes(tagName) && (tagName !== 'input' || editableInputTypes.includes(inputType))
  }

  function handleKeyPress(event: KeyboardEvent) {
    // 检查事件目标
    const target = event.target as HTMLElement

    // 如果是可编辑元素，则不触发热键
    if (isEditable(target)) {
      return
    }

    // 继续处理热键...
    console.log('handleKeyPress', event)
    setCount(count => count + 1)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <>
      <input type='text' />
      <span>Pressed 'a' key {count} times.</span>
    </>
  )
}

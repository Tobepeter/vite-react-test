export const TimerDemo = () => {
  const test_timer_out_negative = () => {
    // NOTE: 经过测试，< 0 都按照 0 来处理
    const timer = setTimeout(() => {
      console.log('timer')
    }, -1000)
  }

  useEffect(() => {
    test_timer_out_negative()
  }, [])

  return <div>TimerDemo</div>
}

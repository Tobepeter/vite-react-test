import gsap from 'gsap'

export const GsapCallTime = () => {
  useEffect(() => {
    requestAnimationFrame(() => {
      console.log('raf call')
    })
    Promise.resolve().then(() => {
      console.log('promise then')
    })
    let hasLog = false
    setTimeout(() => {
      console.log('setTimeout')
    }, 0)
    const tween = gsap.to('.gsap-test', {
      duration: 1,
      x: 100,
      onUpdate: () => {
        // NOTE: 经过测试，gsap会在promise之后，下一个raf或定时器之前执行
        if (!hasLog) {
          hasLog = true
          console.log('gsap onUpdate')
        }
      },
    })
    console.log('tween', tween)
    Promise.resolve().then(() => {
      console.log('promise then after tween')
    })
  }, [])

  return (
    <div
      className="gsap-test"
      style={{ width: '100px', height: '100px', background: 'red' }}
    ></div>
  )
}

import gsap from 'gsap'

/**
 * 测试gsap的执行时机
 *
 * [异步] gsap的onUpdate是异步的，非同步执行
 * [时机] 在下一个RAF执行，但是Promise.then后执行，应该是在一个为微任务队列
 *
 * [无间隔] 如果duration设置为0，onUpdate会立即执行, onComplete也是
 */
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
    // const duration = 1
    const duration = 0
    const tween = gsap.to('.gsap-test', {
      duration,
      x: 100,
      onUpdate: () => {
        // NOTE: 经过测试，gsap会在promise之后，下一个raf或定时器之前执行
        if (!hasLog) {
          hasLog = true
          console.log('gsap onUpdate')
        }
      },
      onComplete: () => {
        console.log('gsap onComplete')
      },
    })
    console.log('tween', tween)
    Promise.resolve().then(() => {
      console.log('promise then after tween')
    })
  }, [])

  return <div className="gsap-test" style={{ width: '100px', height: '100px', background: 'red' }}></div>
}

import gsap from 'gsap'

export const GsapSimple = () => {
  useEffect(() => {
    const test_simple = () => {
      // 基础动画示例
      const tween = gsap.to('.gsap-test', {
        duration: 1,
        x: 100,
        y: 50,
        rotation: 360,
        ease: 'power2.out',
        // NOET: onUpdate没有参数，只能通过实例，或者非剪头函数用 this 进行访问
        onUpdate: () => {
          const progress = tween.progress()
          console.log('progress', progress)
        },
      })
    }
    test_simple()
  }, [])

  return <div className='gsap-test' style={{ width: '100px', height: '100px', background: 'red' }}></div>
}

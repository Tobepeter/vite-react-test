import { gsap } from 'gsap'

/**
 * gsap 的 onStart 测试
 *
 * 经过测试，只有第一个有效的缓动才会有真正触发 onStart
 */
export const GsapOnStart = () => {
  useEffect(() => {
    gsap.to('.box', {
      x: 100,
      delay: 1,
      onStart: () => {
        console.log('onStart')
      },
    })
  }, [])

  return (
    <div
      className='box'
      style={{
        width: '20px',
        height: '20px',
        background: 'red',
        position: 'absolute',
        left: 0,
        top: 2 * 100,
      }}
    >
      GsapOnStart
    </div>
  )
}

import { Button } from 'antd'
import gsap from 'gsap'

/**
 * 测试gsap对dom的支持
 *
 * 使用游戏开发使用，gsap总是要考虑kill的问题
 * 测试使用dom，是否会自动kill
 */
export const GsapDomUnmount = () => {
  const [showRect, setShowRect] = useState(true)

  const Rect = () => {
    useEffect(() => {
      // NOTE: 经过测试，gsap并没有适配dom的一些挂载销毁，组件卸载了，gsap的complete还是会被触发
      gsap.to('.rect', {
        x: 100,
        duration: 2,
        ease: 'power1.inOut',
        onComplete: () => {
          console.log('onComplete')
        },
      })
    }, [])
    return <div className='bg-red-500 w-10 h-10 rect'></div>
  }

  return (
    <div>
      {showRect && <Rect />}
      <div>
        <Button
          onClick={() => {
            setShowRect(!showRect)
          }}
        >
          kill
        </Button>
      </div>
    </div>
  )
}

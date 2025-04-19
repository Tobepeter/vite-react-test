import { Button, Space } from 'antd'
import gsap from 'gsap'

export const GsapScope = () => {
  const [isFast, setIsFast] = useState(true)
  const count = 3
  const tweenList = useRef<gsap.core.Tween[]>([])

  const onToggleFast = () => {
    const newIsFast = !isFast
    setIsFast(newIsFast)

    const tw1 = tweenList.current[0]
    const tw2 = tweenList.current[1]

    const speed = newIsFast ? 2 : 1

    /**
     * 关于gsap.Context
     *
     * 一开始我想通过这个实现的，但是gsapd的context功能非常有限
     * 只能提供了一个简单的revert清理函数，看起来gsap只能自己手动去管理了
     */
    tw1.timeScale(speed)
    tw2.timeScale(speed)
  }

  const onClickKill = () => {
    const tw1 = tweenList.current[0]
    tw1.kill()
  }

  const startMoveWithPingpong = () => {
    if (tweenList.current.length > 0) {
      tweenList.current.forEach(tw => tw.kill())
      tweenList.current = []
    }

    for (let i = 0; i < count; i++) {
      const tw = gsap.to(`.ball-${i}`, {
        x: 200,
        duration: 1,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })

      tweenList.current.push(tw)
    }
  }

  useEffect(() => {
    startMoveWithPingpong()
  }, [])

  return (
    <div className='p-2'>
      <div className='mt-2'>
        <Space>
          <Button onClick={onToggleFast}>{isFast ? '慢速' : '快速'}</Button>
          <Button onClick={onClickKill}>kill</Button>
        </Space>
      </div>

      <Space className='mt-2' direction='vertical' align='center'>
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className={`ball-${i}`}
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: `hsl(${i * 120}, 70%, 50%)`,
            }}
          />
        ))}
      </Space>
    </div>
  )
}

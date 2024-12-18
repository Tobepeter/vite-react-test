import { Button, Space, Switch } from 'antd'
import gsap from 'gsap'

export const GsapTranslate = () => {
  const el = useRef<HTMLDivElement>(null)
  const timerId = useRef<number>(0)
  const countObj = useRef({ y: 0 })
  const [noLagSmooth, setNoLagSmooth] = useState(false)

  const runTest = () => {
    console.log('runTest')

    // NOTE: 有点坑，gsap会在元素上还一个隐藏字段，需要清理，否则第二次直接到达目标值了，只能用这个清理
    gsap.set(el.current, { clearProps: 'all' })
    // el.current.style.transform = 'translate(0px, 0px)'

    const duration = 2
    const startTime = Date.now()

    gsap.killTweensOf(el.current)
    gsap.to(el.current, {
      y: 500,
      duration,
      ease: 'none', // 添加线性缓动确保动画更可预测
      onComplete() {
        const endTime = Date.now()
        const elapse = (endTime - startTime) / 1000
        console.log('gsap animation complete time: ', elapse)
      },
      onUpdate() {
        console.log('gsap animation update')
      },
    })
  }

  const toggleNoLagSmooth = () => {
    const newValue = !noLagSmooth
    setNoLagSmooth(newValue)
    gsap.ticker.lagSmoothing(newValue ? 0 : 500)
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      console.log('hidden: ', document.hidden)
    })

    runTest()
  }, [])

  return (
    <div>
      <div className="flex justify-center items-center">
        <Space>
          <Button onClick={runTest}>Run Test</Button>
          <div>
            <span>No Lag Smooth</span>
            <Switch checked={noLagSmooth} onChange={toggleNoLagSmooth} />
          </div>
        </Space>
      </div>
      <div ref={el} className="w-[20px] h-[20px] bg-red-500 absolute left-[20px] top-0" />
    </div>
  )
}

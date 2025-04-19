import { Button, Space, Switch } from 'antd'
import gsap from 'gsap'

/**
 * 测试gsap后台的complete时机
 *
 * 结论，定时器在后台会有一定的误差，比如3s的定时器，可能实际执行时候是3.7s
 * 但是gsap一定要等到切换后台回来才会执行callback
 */
export const GsapHiddenCb = () => {
  const [isNoLagSmooth, setIsNoLagSmooth] = useState(true)
  const countObj = useRef({ y: 0 })
  const el = useRef<HTMLDivElement>(null)
  const preTimeoutId = useRef<number>(0)
  const postTimeoutId = useRef<number>(0)
  const duration = 3

  gsap.ticker.lagSmoothing(isNoLagSmooth ? 0 : 500)

  const runTest = () => {
    clearTimeout(preTimeoutId.current)
    clearTimeout(postTimeoutId.current)

    const startTime = Date.now()
    const getDelta = () => {
      return ((Date.now() - startTime) / 1000).toFixed(2) + 's'
    }

    preTimeoutId.current = setTimeout(() => {
      console.log('preTimeoutId', getDelta())
    }, duration * 1000) as unknown as number

    countObj.current.y = 0
    gsap.killTweensOf(countObj.current)
    gsap.to(countObj.current, {
      y: 500,
      duration,
      onComplete: () => {
        console.log('gsap complete', getDelta())
      },
      onUpdate: () => {
        el.current!.style.top = `${countObj.current.y}px`
      },
    })

    postTimeoutId.current = setTimeout(() => {
      console.log('postTimeoutId', getDelta())
    }, duration * 1000) as unknown as number
  }

  useEffect(() => {
    runTest()

    document.addEventListener('visibilitychange', () => {
      console.log('visibilitychange, hidden:', document.hidden)
    })
  }, [])

  return (
    <div>
      <div className='flex items-center justify-center'>
        <Space>
          <Button onClick={runTest}>Run Test</Button>
          <div>
            <span>No Lag Smooth</span>
            <Switch
              checked={isNoLagSmooth}
              onChange={() => {
                setIsNoLagSmooth(!isNoLagSmooth)
              }}
            />
          </div>
        </Space>
      </div>
      <div ref={el} className='w-10 h-10 bg-red-500 rounded-full absolute left-10 top-0'></div>
    </div>
  )
}

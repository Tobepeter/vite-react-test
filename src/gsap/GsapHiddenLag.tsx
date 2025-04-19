import gsap from 'gsap'
import { Pane } from 'tweakpane'
import { Tween, Group } from '@tweenjs/tween.js'
import { Space, Switch } from 'antd'

/**
 * 测试 gsap 的lag smooth
 */
export const GsapHiddenLag = () => {
  const [isNoLagSmooth, setIsNoLagSmooth] = useState(false)

  useEffect(() => {
    if (isNoLagSmooth) {
      gsap.ticker.lagSmoothing(0)
    } else {
      gsap.ticker.lagSmoothing(500, 33)
    }
  }, [isNoLagSmooth])

  useEffect(() => {
    const duration = 60
    const distanceX = 600

    let hidden = document.hidden
    document.addEventListener('visibilitychange', () => {
      hidden = document.hidden
      console.log('hidden', hidden)
    })

    console.log('hidden', hidden)

    // -- gsap --
    // TODO: 貌似x和left属性是对不上的
    // gsap.to(document.getElementById('test-gsap'), {
    //   duration,
    //   x: distanceX,
    // })

    // NOTE: 使用lag smooth可以实现动画快进
    // gsap.ticker.lagSmoothing(0)

    const gsapObj = { x: 0 }
    const gsapTween = gsap.to(gsapObj, {
      duration,
      x: distanceX,
      onUpdate: function () {
        const progress = gsapTween.progress()
        document.getElementById('test-gsap')!.style.left = `${progress * distanceX}px`
      },
    })

    // -- raf --
    const rafStartTime = Date.now()
    const rafFunc = () => {
      const progress = (Date.now() - rafStartTime) / (duration * 1000)
      document.getElementById('test-raf')!.style.left = `${progress * distanceX}px`
      requestAnimationFrame(rafFunc)
    }
    rafFunc()

    // -- tweenjs --
    const tweenGroup = new Group()
    const tweenJSLoop = () => {
      tweenGroup.update()
      requestAnimationFrame(tweenJSLoop)
    }
    tweenJSLoop()

    const tweenObj = { x: 0 }
    const tween = new Tween(tweenObj, tweenGroup).to({ x: 600 }, duration * 1000).onUpdate(({ x }) => {
      document.getElementById('test-tweenjs')!.style.left = `${x}px`
    })
    win.tweenObj = tweenObj
    tween.start()
  }, [])

  const getContent = () => {
    const textArr = ['gsap', 'raf', 'tweenjs']
    const idArr = ['test-gsap', 'test-raf', 'test-tweenjs']
    return idArr.map((id, idx) => {
      const el = document.getElementById(id)
      return (
        <div key={id}>
          <div
            id={id}
            style={{
              width: '20px',
              height: '20px',
              background: 'red',
              position: 'absolute',
              left: 0,
              top: idx * 100,
            }}
          >
            {textArr[idx]}
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <Space>
        <div>关闭lag smooth</div>
        <Switch checked={isNoLagSmooth} onChange={setIsNoLagSmooth} />
      </Space>

      <div className='mt-4 relative'>{getContent()}</div>
    </>
  )
}

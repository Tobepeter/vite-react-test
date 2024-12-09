import gsap from 'gsap'
import { Pane } from 'tweakpane'
import { Tween, Group } from '@tweenjs/tween.js'

export const GsapHidden = () => {
  useEffect(() => {
    const duration = 60
    const distanceX = 600

    const gsapHistory: number[] = []
    const rafHistory: number[] = []
    const tweenJSHistory: number[] = []
    const recordDur = 2 * 1000
    let gsapRecordTime = -1
    let rafRecordTime = -1
    let tweenJSRecordTime = -1
    let recordFinishCount = 0

    let hidden = document.hidden
    document.addEventListener('visibilitychange', () => {
      hidden = document.hidden
      console.log('hidden', hidden)
      if (hidden) {
        if (gsapRecordTime === -1) {
          gsapRecordTime = Date.now()
        }
        if (rafRecordTime === -1) {
          rafRecordTime = Date.now()
        }
        if (tweenJSRecordTime === -1) {
          tweenJSRecordTime = Date.now()
        }
      }
    })

    console.log('hidden', hidden)

    const checkRecordFinish = () => {
      console.log('recordFinishCount', recordFinishCount)
      if (recordFinishCount >= 3) {
        console.log('gsapHistory', gsapHistory)
        console.log('rafHistory', rafHistory)
        console.log('tweenJSHistory', tweenJSHistory)
      }
    }

    // gsap
    const gsapTween = gsap.to(document.getElementById('test'), {
      duration,
      x: distanceX, // 增加移动距离
      onUpdate: function () {
        const deltaSec = (Date.now() - gsapRecordTime) / 1000
        if (gsapRecordTime > 0) {
          if (Date.now() - gsapRecordTime < recordDur) {
            gsapHistory.push(deltaSec)
          } else {
            gsapRecordTime = -2
            recordFinishCount++
            checkRecordFinish()
          }
        }
        const progress = gsapTween.progress()
        document.getElementById('test-gsap')!.style.left = `${progress * distanceX}px`
      },
    })

    // raf
    const rafStartTime = Date.now()
    const rafFunc = () => {
      if (rafRecordTime > 0) {
        const deltaSec = (Date.now() - rafRecordTime) / 1000
        if (Date.now() - rafRecordTime < recordDur) {
          rafHistory.push(deltaSec)
        } else {
          rafRecordTime = -2
          recordFinishCount++
          checkRecordFinish()
        }
      }
      const progress = (Date.now() - rafStartTime) / (duration * 1000)
      document.getElementById('test-raf')!.style.left = `${progress * distanceX}px`
      requestAnimationFrame(rafFunc)
    }
    rafFunc()

    // tweenjs
    const tweenGroup = new Group()
    const tweenJSLoop = () => {
      tweenGroup.update()
      requestAnimationFrame(tweenJSLoop)
    }
    tweenJSLoop()

    const tweenObj = { x: 0 }
    const tween = new Tween(tweenObj, tweenGroup).to({ x: 600 }, duration * 1000).onUpdate(({ x }) => {
      if (tweenJSRecordTime > 0) {
        if (Date.now() - tweenJSRecordTime < recordDur) {
          const deltaSec = (Date.now() - tweenJSRecordTime) / 1000
          tweenJSHistory.push(deltaSec)
        } else {
          tweenJSRecordTime = -2
          recordFinishCount++
          checkRecordFinish()
        }
      }

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

  return <>{getContent()}</>
}

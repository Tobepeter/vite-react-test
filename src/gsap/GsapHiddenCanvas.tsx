import gsap from 'gsap'
import { Pane } from 'tweakpane'

export const GsapHiddenCanvas = () => {
  useEffect(() => {
    // 最多记录的时间长度
    const duration = 5 * 1000
    const width = 3000
    const height = 600
    const dpr = window.devicePixelRatio
    const cssWidth = Math.round(width / dpr)
    const cssHeight = Math.round(height / dpr)
    const lineHeight = 80
    const lineGap = 4
    const heightCount = 2
    const hGap = height / (heightCount + 1)

    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    canvas.style.width = `${cssWidth}px`
    canvas.style.height = `${cssHeight}px`

    const gsapHistory: number[] = []
    const rafHistory: number[] = []

    let gsapStart = Date.now()
    let rafStart = Date.now()

    let hidden = document.hidden
    let preHidden = hidden
    document.addEventListener('visibilitychange', () => {
      hidden = document.hidden
      if (hidden) {
        preHidden = true
      }
    })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const heightHalf = lineHeight / 2
      const gapHalf = lineGap / 2
      let startY = hGap

      for (let i = 0; i < gsapHistory.length; i++) {
        ctx.beginPath()
        ctx.strokeStyle = 'red'
        let t = (gsapHistory[i] - gsapStart) / duration
        t = Math.max(0, Math.min(1, t))
        const x = t * width
        ctx.moveTo(x, startY - heightHalf)
        ctx.lineTo(x, startY + heightHalf)
        ctx.stroke()
      }

      startY += hGap

      for (let i = 0; i < rafHistory.length; i++) {
        ctx.beginPath()
        ctx.strokeStyle = 'green'
        let t = (rafHistory[i] - rafStart) / duration
        t = Math.max(0, Math.min(1, t))
        const x = t * width
        ctx.moveTo(x, startY - gapHalf)
        ctx.lineTo(x, startY + gapHalf)
        ctx.stroke()
      }
    }

    const tween = gsap.to(
      {},
      {
        duration,
        x: 600, // 增加移动距离
        onUpdate: function () {
          const now = Date.now()
          // 超出时间，移除最早的记录
          if (now - gsapStart > duration) {
            if (gsapHistory.length) {
              gsapHistory.shift()
              if (gsapHistory.length) {
                gsapStart = gsapHistory[0]
              }
            }
          }
          gsapHistory.push(now)
        },
      }
    )

    const rafFunc = () => {
      const now = Date.now()
      if (now - rafStart > duration) {
        if (rafHistory.length) {
          rafHistory.shift()
          if (rafHistory.length) {
            rafStart = rafHistory[0]
          }
        }
      }
      rafHistory.push(now)
      requestAnimationFrame(rafFunc)
    }
    rafFunc()

    let paused = false
    const drawLoop = () => {
      if (paused) return
      draw()
      requestAnimationFrame(drawLoop)
    }
    drawLoop()

    const pane = new Pane()
    pane.addButton({ title: '暂停' }).on('click', () => {
      paused = !paused
      console.log('paused', paused)
    })
  }, [])

  return <canvas style={{ border: '1px solid #ccc' }} />
}

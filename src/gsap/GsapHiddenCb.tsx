import gsap from 'gsap'

export const GsapHiddenCb = () => {
  const el = useRef<HTMLDivElement>(null)

  const runTest = async () => {
    // gsap.ticker.lagSmoothing(0)

    await sleep(1000)

    const duration = 2

    const startTime = Date.now()

    document.addEventListener('visibilitychange', () => {
      console.log('hidden: ', document.hidden)
    })

    el.current.style.transform = 'translate3d(0, 0, 0)'

    setTimeout(() => {
      const endTime = Date.now()
      const elapse = (endTime - startTime) / 1000
      console.log('setTimeoout call time: ', elapse)
    }, duration * 1000)

    gsap.to(el.current, {
      x: 500,
      duration,
      onComplete() {
        const endTime = Date.now()
        const elapse = (endTime - startTime) / 1000
        console.log('gsap animation complete time: ', elapse)
      },
    })
  }

  useEffect(() => {
    runTest()
  }, [])

  return <div ref={el} className="w-[20px] h-[20px] bg-red-500 absolute left-0 top-[500px]" />
}

import classNames from 'classnames'
import { useState, useRef, useEffect } from 'react'
import './HtmlCustomScroll.css'
export const HtmlCustomScroll = () => {
  // -- config --
  const daming = 0.98
  const maxVelocity = 10
  const width = window.innerWidth
  const height = window.innerHeight
  const itemHeight = 500
  const enableScroll = false
  const speed = 1

  // -- state --
  const [scrollY, setScrollY] = useState(0)
  const lastTouchY = useRef(0)
  const isDragging = useRef(false)
  const velocity = useRef(0)
  const lastMoveTime = useRef(0)
  const maxScrollY = useRef(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    lastTouchY.current = e.clientY
    isDragging.current = true
    lastMoveTime.current = Date.now()
  }

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    lastTouchY.current = e.touches[0].clientY
    isDragging.current = true
    lastMoveTime.current = Date.now()
  }

  const clampScrollY = (value: number) => {
    return Math.max(0, Math.min(value, maxScrollY.current))
  }

  const onMoveDelta = (clientY: number) => {
    const deltaY = (clientY - lastTouchY.current) * speed

    // 注意，scrollY是正数，往上移动是负数
    setScrollY(prev => clampScrollY(prev - deltaY))
    lastTouchY.current = clientY

    // 实时计算速度
    const deltaTime = Date.now() - lastMoveTime.current
    if (deltaTime > 0) {
      velocity.current = -deltaY / deltaTime

      // 限制速度
      if (velocity.current > maxVelocity) {
        velocity.current = maxVelocity
      } else if (velocity.current < -maxVelocity) {
        velocity.current = -maxVelocity
      }
    }

    lastMoveTime.current = Date.now()
  }

  // TODO: 不知道为什么，chrome模拟器这个不能持续派发，只能短暂派发3-5下
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    onMoveDelta(e.clientY)
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    onMoveDelta(e.touches[0].clientY)
  }

  const onPointerUp = () => {
    isDragging.current = false
  }

  const onTouchEnd = () => {
    isDragging.current = false
  }

  // TODO: 明明在容器内移动，也会触发leave??
  const onPointerLeave = () => {
    isDragging.current = false
  }

  // -- 更新惯性滚动 --
  useEffect(() => {
    let requestId: number

    const updateVelocity = () => {
      // 只有拖拽结束才更新滚动
      if (isDragging.current) return
      if (velocity.current === 0) return

      setScrollY(prev => clampScrollY(prev + velocity.current))
      velocity.current *= daming
      if (Math.abs(velocity.current) < 0.001) {
        velocity.current = 0
      }
    }

    const loop = () => {
      updateVelocity()
      requestId = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(requestId)
  }, [])

  // -- 监听页面失去焦点和隐藏 --
  useEffect(() => {
    window.addEventListener('blur', () => {
      isDragging.current = false
    })

    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        isDragging.current = false
      }
    })

    return () => {
      window.removeEventListener('blur', () => {})
      window.removeEventListener('visibilitychange', () => {})
    }
  }, [])

  // -- 计算最大滚动 --
  useEffect(() => {
    const bounding = contentRef.current.getBoundingClientRect()
    const contentHeight = bounding.height - bounding.top
    const viewportHeight = viewportRef.current.clientHeight
    maxScrollY.current = contentHeight - viewportHeight

    // -- log --
    console.log('bounding info: ', {
      contentHeight,
      viewportHeight,
      maxScrollY: maxScrollY.current,
    })
  }, [])

  // -- wrapper监听 --
  useEffect(() => {
    // -- pointermove --
    // viewportRef.current.addEventListener(
    //   'pointermove',
    //   (e) => {
    //     e.preventDefault()
    //     onPointerMove(e as unknown as React.PointerEvent<HTMLDivElement>)
    //   },
    //   { passive: false }
    // )

    // -- touchmove --
    viewportRef.current.addEventListener(
      'touchmove',
      e => {
        // NOTE: 貌似只有这个方法才可以阻止浏览器的默认边缘回弹
        e.preventDefault()
        onTouchMove(e as unknown as React.TouchEvent<HTMLDivElement>)
      },
      // TODO: 这里其实不设置是可以的
      //  但是不知道为什么react的callback如果调用preventDefault
      //  会有如下报错：
      //  Unable to preventDefault inside passive event listener invocation.
      { passive: false }
    )
  }, [])

  const wrapperClassName = classNames('relative border no-scrollbar', {
    'overflow-scroll': enableScroll,
    'overflow-hidden': !enableScroll,
  })

  return (
    <div
      className={wrapperClassName}
      style={{
        height,
        width,
      }}
      // onPointerDown={onPointerDown}
      // NOTE：这些都不能 preventDefault，why?
      // onPointerMove={onPointerMove}
      // onPointerUp={onPointerUp}
      // onPointerLeave={onPointerLeave}

      onTouchStart={onTouchStart}
      // onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      ref={viewportRef}
    >
      <div
        style={{
          transform: `translateY(-${scrollY}px)`,
        }}
        ref={contentRef}
      >
        <div className='bg-blue-200' style={{ height: itemHeight }} />
        <div className='bg-green-200' style={{ height: itemHeight }} />
        <div className='bg-yellow-200' style={{ height: itemHeight }} />
        <div className='bg-red-200' style={{ height: itemHeight }} />
      </div>
    </div>
  )
}

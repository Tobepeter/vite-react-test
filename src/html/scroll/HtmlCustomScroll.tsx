import classNames from 'classnames'
import { useState, useRef, useEffect } from 'react'
import './HtmlCustomScroll.css'
export const HtmlCustomScroll = () => {
  // -- config --
  const daming = 0.98
  const maxVelocity = 10
  const height = 800
  const width = 500
  const enableScroll = false

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

  const clampScrollY = (value: number) => {
    return Math.max(0, Math.min(value, maxScrollY.current))
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const deltaY = e.clientY - lastTouchY.current
    // 注意，scrollY是正数，往上移动是负数
    setScrollY((prev) => clampScrollY(prev - deltaY))
    lastTouchY.current = e.clientY

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

  const onPointerUp = () => {
    isDragging.current = false
  }

  const onPointerLeave = () => {
    isDragging.current = false
  }

  const updateVelocity = () => {
    // 只有拖拽结束才更新滚动
    if (isDragging.current) return
    if (velocity.current === 0) return

    setScrollY((prev) => clampScrollY(prev + velocity.current))
    velocity.current *= daming
    if (Math.abs(velocity.current) < 0.001) {
      velocity.current = 0
    }
  }

  // 更新滚动
  useEffect(() => {
    let requestId: number
    const loop = () => {
      updateVelocity()
      requestId = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(requestId)
  }, [])

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

  // 计算最大滚动
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
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      ref={viewportRef}
    >
      <div
        style={{
          transform: `translateY(-${scrollY}px)`,
        }}
        ref={contentRef}
      >
        <div className="bg-blue-200" style={{ height }} />
        <div className="bg-green-200" style={{ height }} />
        <div className="bg-yellow-200" style={{ height }} />
        <div className="bg-red-200" style={{ height }} />
      </div>
    </div>
  )
}

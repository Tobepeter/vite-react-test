import Stats from 'stats.js'
import { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'

export const StatsJsMem = () => {
  const statsRef = useRef<Stats>(null)
  const cacheArrRef = useRef<number[][]>([])

  const increaseMem = () => {
    const mb = 1024 * 1024
    const count = mb
    const increaseApproximately = (4 * count) / mb
    const arr = new Array(count).fill(0)
    console.log(`increaseMem: ${increaseApproximately}MB`)
    cacheArrRef.current.push(arr)
  }

  const clearMem = () => {
    cacheArrRef.current = []
    console.log('clearMem')
  }

  const setUpStats = () => {
    const stats = new Stats()
    statsRef.current = stats

    stats.showPanel(0)

    document.body.appendChild(stats.dom)

    const sytle = stats.dom.style
    sytle.left = 'unset'
    sytle.right = '50px'
    sytle.top = '50px'
    sytle.transform = 'scale(1.5)'
    sytle.opacity = '0.7'

    stats.showPanel(2)

    const animate = () => {
      stats.update()
      requestAnimationFrame(animate)
    }
    animate()
  }

  useEffect(() => {
    setUpStats()
  }, [])

  return (
    <div>
      <Button onClick={increaseMem}>increaseMem</Button>
      <Button onClick={clearMem}>clearMem</Button>
    </div>
  )
}

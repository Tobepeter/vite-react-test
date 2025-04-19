import Stats from 'stats.js'
import { useEffect, useRef } from 'react'

export const StatsJsDemo = () => {
  const statsRef = useRef<Stats>(null)

  const posStat = () => {
    const stats = statsRef.current!

    const { style } = stats.dom
    style.left = 'unset'
    style.right = '50px'
    style.top = '50px'
    style.transform = 'scale(1.5)'
    style.opacity = '0.7'
  }

  useEffect(() => {
    const stats = new Stats()
    statsRef.current = stats

    stats.showPanel(0)

    document.body.appendChild(stats.dom)
    posStat()

    const animate = () => {
      stats.update()
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return <div>Stats.js Demo</div>
}

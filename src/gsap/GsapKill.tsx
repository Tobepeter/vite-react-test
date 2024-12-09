import gsap from 'gsap'
import { useEffect } from 'react'

export const GsapKill = () => {
  useEffect(() => {
    const tween = gsap.to('#circle', {
      duration: 5,
      x: 500,
      repeat: -1,
      ease: 'linear',
    })

    const handleKill = () => {
      tween.kill()
    }

    document.getElementById('kill-btn')?.addEventListener('click', handleKill)

    return () => {
      document.getElementById('kill-btn')?.removeEventListener('click', handleKill)
    }
  }, [])

  return (
    <div>
      <div
        id="circle"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'red',
          position: 'absolute',
          left: 0,
          top: '100px',
        }}
      />
      <button id="kill-btn">Kill Animation</button>
    </div>
  )
}

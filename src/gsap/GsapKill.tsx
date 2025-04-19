import { Button, Space } from 'antd'
import gsap from 'gsap'
import { useEffect } from 'react'
import { gain } from 'three/webgpu'

export const GsapKill = () => {
  const tweenRef = useRef<gsap.core.Tween>(null)

  useEffect(() => {
    const tween = gsap.to('#circle', {
      duration: 5,
      x: 500,
      repeat: -1,
      ease: 'linear',
    })
    tweenRef.current = tween

    const handleKill = () => {
      tween.kill()
    }

    document.getElementById('kill-btn')?.addEventListener('click', handleKill)

    return () => {
      document.getElementById('kill-btn')?.removeEventListener('click', handleKill)
    }
  }, [])

  const actions = {
    kill: () => tweenRef.current?.kill(),
    resume: () => tweenRef.current?.resume(),
    pause: () => tweenRef.current?.pause(),
    reverse: () => tweenRef.current?.reverse(),
    restart: () => tweenRef.current?.restart(),
  }

  return (
    <div>
      <div id='circle' className='w-[50px] h-[50px] rounded-full bg-red-500 absolute left-0 top-[300px]' />
      <Space>
        <Button id='kill-btn' onClick={actions.kill}>
          终止
        </Button>
        <Button onClick={actions.resume}>继续</Button>
        <Button onClick={actions.pause}>暂停</Button>
        <Button onClick={actions.reverse}>反向</Button>
        <Button onClick={actions.restart}>重启</Button>
      </Space>
    </div>
  )
}

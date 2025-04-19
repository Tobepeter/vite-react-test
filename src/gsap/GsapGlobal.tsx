import { Button, Col, Row, Slider, Space } from 'antd'
import gsap from 'gsap'
import { useEffect } from 'react'
import { gain } from 'three/webgpu'

export const GsapGlobal = () => {
  const tweenRef = useRef<gsap.core.Tween>(null)
  const [globalSpeed, setGlobalSpeed] = useState(1)

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
    kill: () => gsap.globalTimeline.kill(),
    resume: () => gsap.globalTimeline.resume(),
    pause: () => gsap.globalTimeline.pause(),
    reverse: () => gsap.globalTimeline.reverse(),
    restart: () => gsap.globalTimeline.restart(),
  }

  return (
    <div>
      <div id='circle' className='w-[50px] h-[50px] rounded-full bg-red-500 absolute left-0 top-[300px]' />
      <Space className='mt-4'>
        <Button id='kill-btn' onClick={actions.kill}>
          终止
        </Button>
        <Button onClick={actions.resume}>继续</Button>
        <Button onClick={actions.pause}>暂停</Button>
        <Button onClick={actions.reverse}>反向</Button>
        <Button onClick={actions.restart}>重启</Button>
      </Space>
      <Row className='mt-4'>
        <Col span={2}>
          <div className='mb-2'>速度</div>
        </Col>
        <Col span={20}>
          <Slider
            value={globalSpeed}
            min={0.1}
            max={2}
            step={0.0001}
            onChange={value => {
              gsap.globalTimeline.timeScale(value)
              setGlobalSpeed(value)
            }}
          />
        </Col>
      </Row>
    </div>
  )
}

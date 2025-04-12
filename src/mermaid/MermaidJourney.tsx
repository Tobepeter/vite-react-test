import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export const MermaidJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    })

    if (containerRef.current) {
      mermaid
        .render(
          'journey-diagram',
          `
        journey
          title 用户注册流程
          section 注册前
            访问网站: 5: 用户
            浏览内容: 3: 用户
          section 注册中
            填写信息: 5: 用户
            验证邮箱: 3: 用户
          section 注册后
            完善资料: 4: 用户
            开始使用: 5: 用户
      `
        )
        .then(({ svg }) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svg
          }
        })
    }
  }, [])

  return <div ref={containerRef}></div>
}

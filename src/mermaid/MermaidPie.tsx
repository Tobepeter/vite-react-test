import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export const MermaidPie = () => {
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
          'pie-diagram',
          `
        pie title 项目时间分配
          "需求分析" : 20
          "开发" : 40
          "测试" : 25
          "部署" : 15
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

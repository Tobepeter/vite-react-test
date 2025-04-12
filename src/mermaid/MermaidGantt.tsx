import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export const MermaidGantt = () => {
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
          'gantt-diagram',
          `
        gantt
          title 项目计划
          dateFormat  YYYY-MM-DD
          section 设计
          需求分析    :a1, 2024-01-01, 7d
          系统设计    :a2, after a1, 5d
          section 开发
          前端开发    :a3, after a2, 10d
          后端开发    :a4, after a2, 12d
          section 测试
          单元测试    :a5, after a3, 5d
          集成测试    :a6, after a4, 5d
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

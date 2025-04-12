import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export const MermaidSequence = () => {
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
          'sequence-diagram',
          `
        sequenceDiagram
          participant 用户
          participant 系统
          participant 数据库
          
          用户->>系统: 发送请求
          系统->>数据库: 查询数据
          数据库-->>系统: 返回结果
          系统-->>用户: 显示结果
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

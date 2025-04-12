import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export const MermaidState = () => {
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
          'state-diagram',
          `
        stateDiagram-v2
          [*] --> 空闲
          空闲 --> 处理中: 开始处理
          处理中 --> 完成: 处理完成
          完成 --> 空闲: 重置
          处理中 --> 错误: 发生错误
          错误 --> 空闲: 重试
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

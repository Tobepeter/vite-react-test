import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export const MermaidFlowChart = () => {
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
          'flowchart-diagram',
          `
        graph TD
          A[开始] --> B{条件判断}
          B -->|条件1| C[操作1]
          B -->|条件2| D[操作2]
          C --> E[结束]
          D --> E
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

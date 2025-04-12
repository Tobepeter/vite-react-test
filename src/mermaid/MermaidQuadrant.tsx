import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export const MermaidQuadrant = () => {
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
          'quadrant-diagram',
          `
        graph TD
          subgraph 高价值
            A[重要且紧急]
            B[重要不紧急]
          end
          subgraph 低价值
            C[紧急不重要]
            D[不紧急不重要]
          end
          
          %% 添加分隔线
          E[高重要性] --- F[低重要性]
          G[高紧急性] --- H[低紧急性]
          
          %% 添加示例项目
          A1[项目A]:::important
          B1[项目B]:::important
          C1[项目C]:::urgent
          D1[项目D]:::normal
          
          classDef important fill:#f9f,stroke:#333,stroke-width:2px
          classDef urgent fill:#bbf,stroke:#333,stroke-width:2px
          classDef normal fill:#dfd,stroke:#333,stroke-width:2px
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

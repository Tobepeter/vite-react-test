import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export const MermaidMindmap = () => {
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
          'mindmap-diagram',
          `
        mindmap
          root((编程学习))
            (前端开发)
              (HTML)
                (基础标签)
                (语义化)
              (CSS)
                (选择器)
                (布局)
                (动画)
              (JavaScript)
                (基础语法)
                (DOM操作)
                (异步编程)
            (后端开发)
              (Node.js)
                (Express)
                (Koa)
              (数据库)
                (MySQL)
                (MongoDB)
            (开发工具)
              (编辑器)
                (VS Code)
                (WebStorm)
              (版本控制)
                (Git)
                (GitHub)
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

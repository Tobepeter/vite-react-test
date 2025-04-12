import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export const MermaidClass = () => {
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
          'class-diagram',
          `
        classDiagram
          class Animal {
            +String name
            +int age
            +makeSound()
          }
          class Dog {
            +fetch()
          }
          class Cat {
            +climb()
          }
          Animal <|-- Dog
          Animal <|-- Cat
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

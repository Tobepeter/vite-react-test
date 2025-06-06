import Stats from 'stats.js'
import { useEffect, useRef } from 'react'
import { StatsJsSimple } from './StatsJsSimple'
import { StatsJsMem } from './StatsJsMem'

export const StatsJsDemo = () => {
  return (
    <div>
      {/* <StatsJsSimple /> */}
      <StatsJsMem />
    </div>
  )
}

import React from 'react'
import ReactDOM from 'react-dom'

class DebugUtil {
  init() {
    win.React = React
    win.ReactDOM = ReactDOM
  }
}

export const debugUtil = new DebugUtil()

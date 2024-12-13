import React from 'react'
import ReactDOM from 'react-dom'
import { nextFrame, sleep } from './common'
import { decorate, inject } from './deco/Decorate'
import { storage } from './Storage'

class GlobalUtil {
  init() {
    this.injectUnplugin()
    this.injectReact()
  }

  private injectReact() {
    win.React = React
    win.ReactDOM = ReactDOM
  }

  private injectUnplugin() {
    const win = window as any
    ;(window as any).win = win

    // -- react --
    win.useEffect = React.useEffect
    win.useState = React.useState
    win.useRef = React.useRef
    win.useCallback = React.useCallback
    win.useMemo = React.useMemo
    win.useContext = React.useContext

    // -- utils --
    win.sleep = sleep
    win.nextFrame = nextFrame

    // -- deco --
    win.decorate = decorate
    win.inject = inject
    win.monitor = decorate.monitor
    win.monitorLog = decorate.monitorLog
    win.monitorDebug = decorate.monitorDebug

    // -- storage --
    win.storage = storage
  }
}

export const globalUtil = new GlobalUtil()

declare global {
  const win: any

  // -- react --
  const useEffect: typeof React.useEffect
  const useState: typeof React.useState
  const useRef: typeof React.useRef
  const useCallback: typeof React.useCallback
  const useMemo: typeof React.useMemo
  const useContext: typeof React.useContext

  // -- utils --
  const sleep: typeof import('./common').sleep
  const nextFrame: typeof import('./common').nextFrame

  // -- deco --
  const decorate: typeof import('./deco/Decorate').decorate
  const inject: typeof import('./deco/Decorate').inject
  const monitor: typeof import('./deco/Decorate').decorate.monitor
  const monitorLog: typeof import('./deco/Decorate').decorate.monitorLog
  const monitorDebug: typeof import('./deco/Decorate').decorate.monitorDebug

  // -- storage --
  const storage: typeof import('./Storage').storage
}

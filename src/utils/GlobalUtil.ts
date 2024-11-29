import React from 'react';
import ReactDOM from 'react-dom';

class GlobalUtil {
  init() {
    this.injectUnplugin();
    this.injectReact();
  }

  private injectReact() {
    win.React = React;
    win.ReactDOM = ReactDOM;
  }

  private injectUnplugin() {
    const win = window as any;
    (window as any).win = win;

    // -- hooks
    win.useEffect = React.useEffect;
    win.useState = React.useState;
    win.useRef = React.useRef;
    win.useCallback = React.useCallback;
    win.useMemo = React.useMemo;
    win.useContext = React.useContext;
  }
}

export const globalUtil = new GlobalUtil();

declare global {
  const win: any;
  const useEffect: typeof React.useEffect;
  const useState: typeof React.useState;
  const useRef: typeof React.useRef;
  const useCallback: typeof React.useCallback;
  const useMemo: typeof React.useMemo;
  const useContext: typeof React.useContext;
}

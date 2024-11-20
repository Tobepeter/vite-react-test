import React from "react";
import ReactDOM from "react-dom";

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
    window.win = window as any;

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
  var win: any;
  var useEffect: typeof React.useEffect;
  var useState: typeof React.useState;
  var useRef: typeof React.useRef;
  var useCallback: typeof React.useCallback;
  var useMemo: typeof React.useMemo;
  var useContext: typeof React.useContext;
}


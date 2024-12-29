class ConsoleGroup {
  init() {
    console.group('ConsoleGroup')
    console.log('ConsoleGroup')
    console.groupCollapsed('ConsoleGroupCollapsed')
    console.log('ConsoleGroupCollapsed')
    console.groupEnd()
    console.groupEnd()
  }
}

export const consoleGroup = new ConsoleGroup()

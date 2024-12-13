class TSAnyCharacter {
  init() {
    this.你好()
    this['🐂🐴']()
  }

  你好() {
    console.log('你好')
  }

  ['🐂🐴']() {
    console.log('🐂🐴')
  }
}

new TSAnyCharacter().init()

export const anyCharacter = new TSAnyCharacter()

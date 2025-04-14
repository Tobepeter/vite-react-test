import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// -- config --
const userDataPath = path.join(__dirname, '../temp', 'chrome-user-data-dir')
const openUrl = 'http://localhost:5173'
const fullScreen = false

function getChromePath() {
  const macPath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  const windowsPathList = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    `C:\\Users\\${process.env.USERNAME}\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe`,
  ]
  const linuxPath = '/usr/bin/google-chrome'

  if (process.platform === 'darwin') {
    return macPath
  } else if (process.platform === 'win32') {
    return windowsPathList.find(path => fs.existsSync(path))
  } else if (process.platform === 'linux') {
    return linuxPath
  }
  console.error('platform not supported')
  return ''
}

/**
 * 运行 chrome 支持前端调试
 */
function main() {
  const chromePath = getChromePath()
  if (!fs.existsSync(chromePath)) {
    console.error('chrome not found')
    return
  }

  // userDataPath 不存在则创建
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true })
  }

  const chromeArgs = [`"${chromePath}"`, '--remote-debugging-port=9222', `--user-data-dir=${userDataPath}`]

  if (openUrl) {
    chromeArgs.push(openUrl)
  }

  if (fullScreen) {
    chromeArgs.push('--start-fullscreen')
  }

  const cmd = chromeArgs.join(' ')
  console.log(cmd)
  execSync(cmd)
}

main()

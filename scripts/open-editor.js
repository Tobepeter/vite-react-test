import cors from 'cors'
import { dirname } from 'dirname-filename-esm'
import express from 'express'
import fs from 'fs'
import openEditor from 'open-editor'
import path from 'path'

const app = express()
const PORT = 3001

const __dirname = dirname(import.meta)
const ROOT_DIR = path.resolve(__dirname, '..')

function main() {
  // 中间件
  app.use(cors())
  app.use(express.json())

  // 日志中间件
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`)
    next()
  })

  // 错误处理中间件
  app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    })
  })

  // 处理打开编辑器的请求
  app.get('/', (req, res) => {
    const { file, line = 1, column = 1 } = req.query

    if (!file) {
      res.status(400).json({
        success: false,
        message: 'Missing file parameter',
      })
      return
    }

    const fileDecode = decodeURIComponent(file)

    if (!path.isAbsolute(fileDecode)) {
      const fullPath = path.resolve(ROOT_DIR, fileDecode)
      if (!fs.existsSync(fullPath)) {
        res.status(400).json({
          success: false,
          message: `文件不存在: ${fullPath}`,
        })
        return
      }
    }

    // 使用 open-editor 打开文件
    openEditor([`${fileDecode}:${line}:${column}`], {
      // editor: 'cursor',
    })

    res.json({
      success: true,
      message: 'File opened successfully',
      data: { file, line, column },
    })
  })

  // 健康检查接口
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      rootDir: ROOT_DIR,
    })
  })

  // 启动服务器
  app.listen(PORT, () => {
    console.log(`
🚀 Open Editor server is running!
   - Local:   http://localhost:${PORT}
   - Health:  http://localhost:${PORT}/health
   - Root:    ${ROOT_DIR}

Press Ctrl+C to stop
  `)
  })
}

main()

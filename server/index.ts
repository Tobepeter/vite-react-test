import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

// 前端是5173，所以需要跨域
app.use(cors())

// 基础测试接口
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' })
})

// 可配置延迟的接口
app.get('/api/delay/:ms', (req, res) => {
  const delay = parseInt(req.params.ms) || 1000
  setTimeout(() => {
    res.json({
      message: `Response delayed by ${delay}ms`,
      delay,
      timestamp: new Date().toISOString(),
    })
  }, delay)
})

// 永不响应的接口（用于测试超时）
app.get('/api/timeout', (req, res) => {
  // 这个接口永远不会响应
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

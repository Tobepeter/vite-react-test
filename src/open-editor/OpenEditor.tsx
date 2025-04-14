import { useCallback, useState } from 'react'
import { Button, Card, message, Space } from 'antd'
import axios from 'axios'

// 配置
const CONFIG = {
  // TODO：可以配置env
  workspacePath: '/Users/tobe/Desktop/work/code-test/vite-react-test',
  serverUrl: 'http://localhost:3001',
  // TODO：读取当前文件url
  file: 'src/open-editor/OpenEditor.tsx',
  line: 2,
  column: 2,
} as const

const axiosIns = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 3000,
})

export const OpenEditor = () => {
  const [loading, setLoading] = useState(false)

  /**
   * 使用 vscode:// 协议
   */
  const openWithVscodeProtocol = () => {
    const { file, line, column } = CONFIG
    const absolutePath = `${CONFIG.workspacePath}/${file}`
    const url = `vscode://file${absolutePath}:${line}:${column}`
    window.open(url)
    message.success('已通过 vscode:// 协议打开文件')
  }

  /**
   * 使用本地服务器
   */
  const openWithLocalServer = async () => {
    const { file, line, column } = CONFIG
    setLoading(true)
    try {
      // NOTE: 编辑器知道当前打开的项目，使用相对路径也可以打开
      const url = `/?file=${encodeURIComponent(file)}&line=${line}&column=${column}`
      const response = await axiosIns.get(url)

      if (response.data.success) {
        message.success('已通过本地服务器打开文件')
      } else {
        throw new Error(response.data.message)
      }
    } catch (error) {
      console.error('打开编辑器失败:', error)
      message.error(error instanceof Error ? error.message : '打开文件失败')
    } finally {
      setLoading(false)
    }
  }

  /**
   * 检查服务器健康状态
   */
  const checkServerHealth = async () => {
    try {
      const response = await axiosIns.get('/health')
      message.info(`服务器状态: ${response.data.status}`)
    } catch (error) {
      message.error('服务器未启动或无法访问')
    }
  }

  return (
    <Card title="打开编辑器">
      <Space direction="vertical" size="middle">
        <Button type="primary" onClick={openWithVscodeProtocol}>
          使用 vscode:// 协议
        </Button>
        <Button type="primary" onClick={openWithLocalServer} loading={loading}>
          使用本地服务器
        </Button>
        <Button onClick={checkServerHealth}>检查服务器状态</Button>
      </Space>
    </Card>
  )
}

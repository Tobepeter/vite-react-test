import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const QuizData = `
100     继续，客户端应继续其请求
101     切换协议，服务器根据客户端的请求切换协议
102     处理中（WebDAV扩展）
200     请求成功
201     已创建，请求成功并且服务器创建了新的资源
204     无内容，服务器成功处理了请求，但没有返回内容
301     永久移动，请求的网页已永久移动到新位置
302     临时移动，服务器目前从不同位置的网页响应请求
304     未修改，自从上次请求后，请求的网页未修改过
400     错误请求，服务器不理解请求的语法
401     未授权，请求要求身份验证
403     禁止，服务器拒绝请求
404     未找到，服务器找不到请求的网页
405     方法禁用，禁用请求中指定的方法
429     请求过多
500     服务器内部错误
502     错误网关，服务器作为网关或代理，从上游服务器收到无效响应
503     服务不可用，服务器目前无法使用
504     网关超时
`

export const Quiz = () => {
  // 使用useMemo缓存解析结果
  const codeDescriptions = useMemo(() => {
    const lines = QuizData.split('\n')
    const parsedData = []

    for (const line of lines) {
      const trimmedLine = line.trim()
      if (trimmedLine) {
        // 使用正则表达式匹配：代码 + 任意空白字符 + 描述
        const match = trimmedLine.match(/^(\d+)\s+(.+)$/)
        if (match) {
          const [, code, description] = match
          parsedData.push({
            code: code.trim(),
            description: description.trim(),
          })
        }
      }
    }

    return parsedData
  }, [])

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [options, setOptions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(new Set())

  const generateOptions = correctAnswer => {
    const otherOptions = codeDescriptions
      .filter(item => item.code !== correctAnswer.code)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    const allOptions = [correctAnswer, ...otherOptions].sort(() => Math.random() - 0.5)

    return allOptions
  }

  const nextQuestion = () => {
    if (codeDescriptions.length === 0) return

    const randomIndex = Math.floor(Math.random() * codeDescriptions.length)
    setCurrentQuestion(randomIndex)
    setOptions(generateOptions(codeDescriptions[randomIndex]))
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(false)
    setWrongAnswers(new Set())
  }

  const handleAnswer = selectedOption => {
    const correct = selectedOption.code === codeDescriptions[currentQuestion].code

    if (correct) {
      // 正确答案
      setSelectedAnswer(selectedOption)
      setShowResult(true)
      setIsCorrect(true)
      setScore(prev => prev + 1)
      setTotalQuestions(prev => prev + 1)

      // 1.5秒后自动进入下一题
      setTimeout(() => {
        nextQuestion()
      }, 1500)
    } else {
      // 错误答案 - 添加到错误列表，允许继续选择
      setWrongAnswers(prev => new Set([...prev, selectedOption.code]))

      // 错误选项晃动动画，0.6秒后移除
      setTimeout(() => {
        setWrongAnswers(prev => {
          const newSet = new Set(prev)
          newSet.delete(selectedOption.code)
          return newSet
        })
      }, 600)
    }
  }

  const resetQuiz = () => {
    setScore(0)
    setTotalQuestions(0)
    nextQuestion()
  }

  useEffect(() => {
    if (codeDescriptions.length > 0) {
      nextQuestion()
    }
  }, [codeDescriptions])

  const currentCode = codeDescriptions[currentQuestion]

  if (codeDescriptions.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
        <Card className='max-w-md'>
          <CardContent className='text-center space-y-4 pt-6'>
            <div className='text-2xl font-semibold text-red-600'>配置数据为空</div>
            <div className='text-gray-600'>请检查 quiz-http.txt 文件内容</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl space-y-6'>
        {/* 主要内容卡片 */}
        <Card className='shadow-xl border-0 overflow-hidden transition-all duration-300'>
          <CardContent className='p-8 space-y-8'>
            {/* 代码显示区域 */}
            <div className='text-center'>
              <div className='inline-block'>
                <Badge variant='outline' className='text-6xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 px-12 py-8 rounded-3xl shadow-2xl'>
                  {currentCode?.code}
                </Badge>
              </div>
              <p className='text-gray-600 mt-4 text-lg'>选择正确的状态码含义</p>
            </div>

            {/* 选项列表 */}
            <div className='grid gap-4'>
              {options.map((option, index) => {
                const isSelected = selectedAnswer?.code === option.code
                const isCorrectAnswer = showResult && option.code === currentCode.code
                const isWrongAnswer = wrongAnswers.has(option.code)

                return (
                  <motion.div
                    key={index}
                    animate={
                      isWrongAnswer
                        ? {
                            x: [-5, 5, -5, 5, -5, 5, 0],
                            transition: { duration: 0.6, ease: 'easeInOut' },
                          }
                        : {}
                    }
                  >
                    <Button
                      variant={isCorrectAnswer ? 'default' : 'outline'}
                      className={`w-full p-6 h-auto text-left justify-start relative text-base border-2 transition-all duration-300 hover:border-blue-400 hover:shadow-md ${
                        isCorrectAnswer ? 'bg-emerald-100 hover:bg-emerald-200 border-emerald-300 text-emerald-800' : ''
                      } ${isWrongAnswer ? 'bg-rose-50 border-rose-200 text-rose-700' : ''} ${showResult ? 'disabled:opacity-100 disabled:pointer-events-auto cursor-default' : ''}`}
                      onClick={() => handleAnswer(option)}
                      disabled={showResult}
                    >
                      <div className='flex items-center w-full'>
                        <div className='flex-1'>
                          <div className='leading-relaxed'>{option.description}</div>
                        </div>
                        {/* 结果状态图标 */}
                        {showResult && isCorrectAnswer && (
                          <div className='ml-4'>
                            <CheckCircle className='w-10 h-10 text-white' />
                          </div>
                        )}
                      </div>
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

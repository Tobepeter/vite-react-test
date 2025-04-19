import { useState } from 'react'

export const MdxDemo = () => {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [result, setResult] = useState(0)

  const calculate = (operator: string) => {
    switch (operator) {
      case '+':
        setResult(num1 + num2)
        break
      case '-':
        setResult(num1 - num2)
        break
      case '*':
        setResult(num1 * num2)
        break
      case '/':
        setResult(num2 !== 0 ? num1 / num2 : 0)
        break
    }
  }

  return (
    <div className='calculator'>
      <h2>简单计算器</h2>
      <div>
        <input type='number' value={num1} onChange={e => setNum1(Number(e.target.value))} />
        <input type='number' value={num2} onChange={e => setNum2(Number(e.target.value))} />
      </div>
      <div>
        <button onClick={() => calculate('+')}>+</button>
        <button onClick={() => calculate('-')}>-</button>
        <button onClick={() => calculate('*')}>×</button>
        <button onClick={() => calculate('/')}>÷</button>
      </div>
      <div>结果: {result}</div>
    </div>
  )
}

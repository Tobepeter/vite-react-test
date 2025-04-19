export const TailwindSimple = () => {
  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Tailwind CSS 演示</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-white shadow rounded-lg p-6'>
          <h2 className='text-xl font-semibold mb-3'>基础样式</h2>
          <p className='text-gray-600 mb-2'>这是一个段落文本</p>
          <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>点击按钮</button>
        </div>

        <div className='bg-white shadow rounded-lg p-6'>
          <h2 className='text-xl font-semibold mb-3'>响应式设计</h2>
          <div className='flex flex-col sm:flex-row gap-2'>
            <div className='bg-gray-100 p-4 rounded'>卡片 1</div>
            <div className='bg-gray-100 p-4 rounded'>卡片 2</div>
          </div>
        </div>
      </div>
    </div>
  )
}

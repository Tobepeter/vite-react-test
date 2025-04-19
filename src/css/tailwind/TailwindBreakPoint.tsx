import { Card } from 'antd'

/**
 * tailwind CSS 断点
 * 实际上，变体如 sm:hidden 最后生成的 css 是
 *
 * @media (max-width: 640px) {
 *   .sm\:hidden {
 *     display: none;
 *   }
 * }
 *
 * 通过转义字符\:来使用
 */
export const TailwindBreakPoint = () => {
  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Tailwind CSS 断点演示</h2>

      <Card title='尺寸断点' hoverable>
        {/* 默认（小于 sm） */}
        <div className='block sm:hidden'>
          <div className='bg-pink-200 p-4 rounded'>默认 (小于 640px)</div>
        </div>

        {/* SM 断点 */}
        <div className='hidden sm:block md:hidden'>
          <div className='bg-blue-200 p-4 rounded'>sm: 640px - 767px</div>
        </div>

        {/* MD 断点 */}
        <div className='hidden md:block lg:hidden'>
          <div className='bg-green-200 p-4 rounded'>md: 768px - 1023px</div>
        </div>

        {/* LG 断点 */}
        <div className='hidden lg:block xl:hidden'>
          <div className='bg-yellow-200 p-4 rounded'>lg: 1024px - 1279px</div>
        </div>

        {/* XL 断点 */}
        <div className='hidden xl:block 2xl:hidden'>
          <div className='bg-purple-200 p-4 rounded'>xl: 1280px - 1535px</div>
        </div>

        {/* 2XL 断点 */}
        <div className='hidden 2xl:block'>
          <div className='bg-red-200 p-4 rounded'>2xl: 1536px 及以上</div>
        </div>

        {/* 所有断点信息 */}
        <div className='mt-8 space-y-2'>
          <h3 className='text-xl font-semibold'>Tailwind 断点说明：</h3>
          <ul className='list-disc pl-5 space-y-1'>
            <li>默认：0px - 639px</li>
            <li>sm: 640px - 767px</li>
            <li>md: 768px - 1023px</li>
            <li>lg: 1024px - 1279px</li>
            <li>xl: 1280px - 1535px</li>
            <li>2xl: 1536px 及以上</li>
          </ul>
        </div>
      </Card>

      <Card title='复合' hoverable>
        {/* sm hover box bg-red */}
        <div className='sm:hover:bg-red-500 h-10 bg-blue-500 mb-2'></div>
        <div className='md:hover:bg-red-500 h-10 bg-blue-500 mb-2'></div>
        <div className='lg:hover:bg-red-500 h-10 bg-blue-500 mb-2'></div>
        <div className='xl:hover:bg-red-500 h-10 bg-blue-500 mb-2'></div>
        <div className='2xl:hover:bg-red-500 h-10 bg-blue-500 mb-2'></div>
      </Card>
    </div>
  )
}

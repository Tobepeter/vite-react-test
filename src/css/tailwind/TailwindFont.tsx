export const TailwindFont = () => {
  return (
    <div className="p-8 space-y-8">
      {/* 字体大小 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">字体大小示例</h2>
        <div className="space-y-2">
          <p className="text-xs">文本大小 xs (12px)</p>
          <p className="text-sm">文本大小 sm (14px)</p>
          <p className="text-base">文本大小 base (16px)</p>
          <p className="text-lg">文本大小 lg (18px)</p>
          <p className="text-xl">文本大小 xl (20px)</p>
          <p className="text-2xl">文本大小 2xl (24px)</p>
        </div>
      </section>

      {/* 字体粗细 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">字体粗细示例</h2>
        <div className="space-y-2">
          <p className="font-thin">字体粗细 thin (100)</p>
          <p className="font-light">字体粗细 light (300)</p>
          <p className="font-normal">字体粗细 normal (400)</p>
          <p className="font-medium">字体粗细 medium (500)</p>
          <p className="font-semibold">字体粗细 semibold (600)</p>
          <p className="font-bold">字体粗细 bold (700)</p>
        </div>
      </section>

      {/* 文本样式 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">文本样式示例</h2>
        <div className="space-y-2">
          <p className="italic">斜体文本</p>
          <p className="underline">下划线文本</p>
          <p className="line-through">删除线文本</p>
          <p className="uppercase">大写文本</p>
          <p className="lowercase">小写文本</p>
          <p className="capitalize">首字母大写文本</p>
        </div>
      </section>

      {/* 文本颜色和对齐 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">文本颜色和对齐示例</h2>
        <div className="space-y-2">
          <p className="text-blue-500">蓝色文本</p>
          <p className="text-green-500">绿色文本</p>
          <p className="text-red-500">红色文本</p>
          <p className="text-center">居中文本</p>
          <p className="text-right">右对齐文本</p>
          <p className="text-justify">两端对齐文本 - 这是一段较长的文本，用来演示两端对齐的效果。这是一段较长的文本，用来演示两端对齐的效果。</p>
        </div>
      </section>
    </div>
  )
}

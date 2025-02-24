export const TailwindArbitraryValue = () => {
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold">Tailwind 任意值示例</h2>

      {/* 颜色任意值 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">颜色任意值</h3>
        <div className="bg-[#8B5CF6] text-white p-4 rounded">使用HEX颜色: bg-[#8B5CF6]</div>
        <div className="bg-[rgb(59,130,246)] text-white p-4 rounded">使用RGB颜色: bg-[rgb(59,130,246)]</div>
      </div>

      {/* 尺寸任意值 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">尺寸任意值</h3>
        <div className="w-[250px] h-[100px] bg-blue-200 flex items-center justify-center">固定宽高: w-[250px] h-[100px]</div>
        <div className="mt-[2.5rem] bg-green-200 p-4">自定义间距: mt-[2.5rem]</div>
      </div>

      {/* 字体任意值 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">字体任意值</h3>
        <p className="text-[20px] text-purple-600">自定义字体大小: text-[20px]</p>
        <p className="leading-[3] bg-gray-100">自定义行高: leading-[3]</p>
      </div>

      {/* 网格和Flex任意值 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">网格和Flex任意值</h3>
        <div className="grid grid-cols-[1fr,2fr,1fr] gap-4">
          <div className="bg-pink-200 p-4">1fr</div>
          <div className="bg-pink-300 p-4">2fr</div>
          <div className="bg-pink-200 p-4">1fr</div>
        </div>
      </div>

      {/* 变换任意值 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">变换任意值</h3>
        <div className="rotate-[17deg] bg-yellow-200 p-4 w-40 text-center">旋转17度: rotate-[17deg]</div>
        <div className="scale-[0.85] bg-orange-200 p-4 w-40 text-center mt-8">缩放0.85: scale-[0.85]</div>
      </div>
    </div>
  )
}

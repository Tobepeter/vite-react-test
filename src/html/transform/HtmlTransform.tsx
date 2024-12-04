import classNames from 'classnames'

/**
 * transform测试
 *
 * 缩放平移都能正确的监听
 * 圆角甚至还能精确监听（而不是矩形区域）
 *
 * 绝对定位也可以点击到
 */
export const HtmlTransform = () => {
  const [count, setCount] = useState(0)
  const [isTranslateX, setIsTranslateX] = useState(false)
  const [isScale, setIsScale] = useState(false)
  const [isAbsolute, setIsAbsolute] = useState(false)

  const onClick = () => {
    console.log('clicked')
    setCount(count + 1)
  }

  const className = classNames('w-[50px] h-[50px] rounded-full bg-red-500', {
    'translate-x-10': isTranslateX,
    'scale-150': isScale,
    absolute: isAbsolute,
  })

  const style = {
    top: isAbsolute ? '200px' : undefined,
    left: isAbsolute ? '10px' : undefined,
  }

  return (
    <div className="pt-10 pl-10 flex flex-col">
      <div className="select-none">{count}</div>
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isTranslateX}
            onChange={(e) => setIsTranslateX(e.target.checked)}
          />
          <span className="select-none">translateX</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isScale}
            onChange={(e) => setIsScale(e.target.checked)}
          />
          <span className="select-none">scale</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAbsolute}
            onChange={(e) => setIsAbsolute(e.target.checked)}
          />
          <span className="select-none">absolute</span>
        </label>
      </div>
      <div className={className} onClick={onClick} style={style}></div>
    </div>
  )
}

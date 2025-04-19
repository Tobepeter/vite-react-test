import classNames from 'classnames'

/**
 * 测试堆叠容器的交互
 *
 * NOTE: 经过测试，如果使用absolute堆叠，总容器设置pointer-events-none，
 * 子元素设置pointer-events-auto，可以实现点击穿透
 *
 * 好像也没有更好的办法了
 */
export const StackContainerDemo = () => {
  const config = {
    disablePointer: true,
  }

  const onFrontClick = () => {
    // console.log('front clicked')
  }

  const onBackClick = () => {
    // console.log('back clicked')
  }

  const onBackButtonClick = () => {
    console.log('back button clicked')
  }

  const onFrontButtonClick = () => {
    console.log('front button clicked')
  }

  const getWrapperStyle = (isFront: boolean) => {
    return classNames('w-full h-full absolute top-0 left-0 opacity-50', {
      'bg-red-500': !isFront,
      'bg-blue-500': isFront,
      'pointer-events-none': config.disablePointer,
    })
  }

  const getButtonStyle = (isFront: boolean) => {
    return classNames('absolute top-20 left-20 bg-white ', {
      'left-20': !isFront,
      'left-80': isFront,
      'pointer-events-auto': config.disablePointer ? true : undefined,
    })
  }

  return (
    <div className='w-screen h-screen'>
      <div id='div-back' className={getWrapperStyle(false)} onClick={onBackClick}>
        <button className={getButtonStyle(false)} onClick={onBackButtonClick}>
          back button
        </button>
      </div>
      <div id='div-front' className={getWrapperStyle(true)} onClick={onFrontClick}>
        <button className={getButtonStyle(true)} onClick={onFrontButtonClick}>
          front button
        </button>
      </div>
    </div>
  )
}

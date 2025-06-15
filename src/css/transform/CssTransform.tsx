const TestAbsoluteTransform = () => {
  // 结论：absolute 偏移后位置交互会考虑 transform

  const onCLickOffset = () => {
    console.log('offset')
  }

  return (
    <>
      <div>TestAbsoluteTransform</div>
      <div className='relative ml-10 mt-10'>
        <div className='w-10 h-10 bg-red-500 absolute top-0 left-0'></div>
        <div onClick={onCLickOffset} className='w-10 h-10 bg-blue-500 absolute top-0 left-0 translate-x-[100px]'></div>
      </div>
    </>
  )
}

const TestRelativeTransform = () => {
  // 结论：relative + translate 考虑交互

  const onCLickOffset = () => {
    console.log('offset')
  }

  return (
    <>
      <div>TestRelativeTransform</div>
      <div className='relative ml-10 mt-10 border border-red-500'>
        <div onClick={onCLickOffset} className='w-10 h-10 bg-blue-500 relative translate-x-[100px] inline-block'></div>
        {/* 布局位置在translate之后 */}
        <div className='inline'>hello</div>
      </div>
    </>
  )
}

const TestRelativeLeft = () => {
  // 结论：relative + left 偏移后可以交互
  const onCLickOffset = () => {
    console.log('offset')
  }

  return (
    <>
      <div>TestRelativeLeft</div>
      <div className='relative ml-10 mt-10'>
        <div className='w-10 h-10 bg-red-500 absolute top-0'></div>
        <div onClick={onCLickOffset} className='w-10 h-10 bg-blue-500 relative left-[100px] inline-block'></div>
        {/* 布局位置在left之前 */}
        <div className='inline'>hello</div>
      </div>
    </>
  )
}

const TestRelativeSize = () => {
  // relative 布局在移动之前
  return (
    <>
      <div>TestRelativeSize</div>
      <div className='relative ml-10 mt-10'>
        <div className='border border-red-500 w-fit flex'>
          <div className='w-10 h-10 bg-blue-500 relative left-[100px]'></div>
        </div>
      </div>
    </>
  )
}

const TestTranslateSize = () => {
  // translate 布局在移动之前
  return (
    <>
      <div>TestTranslateSize</div>
      <div className='relative ml-10 mt-10'>
        <div className='border border-red-500 w-fit flex'>
          <div className='w-10 h-10 bg-blue-500 translate-x-[100px]'></div>
        </div>
      </div>
    </>
  )
}

/**
 *
 * relative 和 translate 的偏移效果
 *
 * https://segmentfault.com/q/1010000000200428
 *
 * 当要偏移的元素里面有fixed元素时，translate会作用在fixed元素上，
 * 从而破坏fixed效果（几乎不会有人想偏移fixed元素）。
 * 如果换成relative，则里面的fixed依然可以fixed。
 */

export const CssTransform = () => {
  return (
    <>
      {/* <TestAbsoluteTransform /> */}
      {/* <TestRelativeTransform /> */}
      {/* <TestRelativeLeft /> */}
      {/* <TestRelativeSize /> */}
      <TestTranslateSize />
    </>
  )
}

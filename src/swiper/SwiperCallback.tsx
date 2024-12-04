import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// 引入 Swiper 样式
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ComponentProps } from 'react'

export const SwiperCallback = () => {
  const colors = ['#f1f1f1', '#e1e1e1', '#d1d1d1', '#c1c1c1']
  const content = []

  for (let i = 0; i < 4; i++) {
    const color = colors[i % colors.length]
    content.push(
      <SwiperSlide key={i}>
        <div style={{ height: '300px', background: color }}>Slide {i}</div>
      </SwiperSlide>
    )
  }

  // [回弹] 即使是没有实际拉过去，回弹也会触发
  // [首次] 默认首次会自动触发一次
  const onSlideChange: React.ComponentProps<typeof Swiper>['onSlideChange'] = (
    e
  ) => {
    // console.log('-- slide change --');

    /**
     * 进度
     * 如果是5个，那么分别是 0, 0.25, 0.5, 0.75, 1
     */
    // console.log('progress', e.progress);

    /**
     * 当前索引
     * 从0开始，指向目标值
     *
     * 如果用了loop模式会很复杂
     * 如果超出了loop，如0123
     * 从3开始继续翻页，会出现23
     * 猜测逻辑是使用两个索引，过渡的
     */
    // console.log('activeIndex', e.activeIndex);

    /**
     * 真实索引
     *
     * 超过3之后会到0
     */
    // console.log('realIndex', e.realIndex);
    // console.log('previousIndex', e.previousIndex);

    /**
     * 开头和结尾
     * 是否到达第一个或者做后一个
     */
    // console.log('isBeginning', e.isBeginning);
    // console.log('isEnd', e.isEnd);
    console.log('isLocked', e.isLocked)
    // console.log('');
  }

  const onSwiper: React.ComponentProps<typeof Swiper>['onSwiper'] = (
    swiper
  ) => {
    // console.log('swiper', swiper);
    win.swiper = swiper

    // TODO: 暂时不知道这个是做什么的
    // swiper.params.cssMode = true;
  }

  const onProgress: React.ComponentProps<typeof Swiper>['onProgress'] = (e) => {
    console.log('progress', e.progress)
  }

  /**
   * 过渡
   *
   * 优先触发总的start，才会触发next或者pre的start
   */
  const transitionFn: ComponentProps<typeof Swiper> = {
    // onSlideNextTransitionStart: () => {
    //   console.log('slide next transition start');
    // },
    // onSlidePrevTransitionStart: () => {
    //   console.log('slide prev transition start');
    // },
    // onSlideNextTransitionEnd: () => {
    //   console.log('slide next transition end');
    // },
    // onSlidePrevTransitionEnd: () => {
    //   console.log('slide prev transition end');
    // },
    // NOTE: 这是一个总的transition结束的回调，但是只有slideChange了才会触发
    // onSlideChangeTransitionStart: () => {
    //   console.log('slide change transition start');
    // },
    // onSlideChangeTransitionEnd: () => {
    //   console.log('slide change transition end');
    // },
    // NOTE: onBeforeTransitionStart 和 onTransitionStart 源码上看其实差别不大，就是时机不同
    // onBeforeTransitionStart: () => {
    //   console.log('before transition start');
    // },
    // onTransitionStart: () => {
    //   console.log('transition start');
    // },
    // onTransitionEnd: () => {
    //   console.log('transition end');
    // },
  }

  const onSliderMove: ComponentProps<typeof Swiper>['onSliderMove'] = (
    swiper,
    event
  ) => {
    console.log('slider move')
  }

  const onToEdge: ComponentProps<typeof Swiper>['onToEdge'] = (swiper) => {
    console.log('to edge', swiper)
  }

  const onFromEdge: ComponentProps<typeof Swiper>['onFromEdge'] = (swiper) => {
    console.log('from edge', swiper)
  }

  /**
   * 设置translate
   *
   * 往左边拖动时候是负数
   * 松手后直接就是目标值
   *
   * 注意loop模式会有点特别，是用附近的一个临时代替的
   */
  const onSetTranslate: ComponentProps<typeof Swiper>['onSetTranslate'] = (
    swiper,
    translate
  ) => {
    console.log('set translate', translate)
  }

  /**
   * 设置过渡
   *
   * 经过测试，开始触摸点击时设置为0
   * 松手设置为300（毫秒）
   */
  const onSetTransition: ComponentProps<typeof Swiper>['onSetTransition'] = (
    swiper,
    transition
  ) => {
    console.log('set transition', transition)
  }

  const onObserverUpdate: ComponentProps<typeof Swiper>['onObserverUpdate'] = (
    swiper
  ) => {
    console.log('observer update')
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      // 间距
      spaceBetween={50}
      slidesPerView={1}
      // 速度，值越大越慢
      speed={1000}
      /**
       * 导航
       *
       * 展示左右导航按钮
       * NOTE: 注意，由于css的特殊性，断点了是不会打断CSS动画的，特别是用导航就可以发现
       */
      navigation={true}
      loop={true}
      pagination={{ clickable: true }}
      // onSlideChange={onSlideChange}
      // NOTE： next 和 prev 的transition callback
      {...transitionFn}
      /**
       * 获取 Swiper 实例
       */
      onSwiper={onSwiper}
      /**
       * 拖动中
       */
      onSliderMove={onSliderMove}

      // onToEdge={onToEdge}
      // onFromEdge={onFromEdge}
      // onSetTranslate={onSetTranslate}
      // onSetTransition={onSetTransition}

      // onObserverUpdate={onObserverUpdate}
      // onActiveIndexChange={() => {
      //   console.log('active index change');
      // }}
      // onBeforeSlideChangeStart={() => {
      //   console.log('before slide change start');
      // }}
      // onUpdate={() => {
      //   console.log('update');
      // }}

      /**
       * 进度
       */
      // onProgress={onProgress}
    >
      {content}
    </Swiper>
  )
}

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// 引入 Swiper 样式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ComponentProps } from 'react';

export const SwiperCallback = () => {
  const colors = ['#f1f1f1', '#e1e1e1', '#d1d1d1', '#c1c1c1'];
  const content = [];

  for (let i = 0; i < 4; i++) {
    const color = colors[i % colors.length];
    content.push(
      <SwiperSlide key={i}>
        <div style={{ height: '300px', background: color }}>Slide {i}</div>
      </SwiperSlide>
    );
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
    console.log('isLocked', e.isLocked);
    // console.log('');
  };

  const onSwiper: React.ComponentProps<typeof Swiper>['onSwiper'] = (
    swiper
  ) => {
    console.log('swiper', swiper);
  };

  const onProgress: React.ComponentProps<typeof Swiper>['onProgress'] = (e) => {
    console.log('progress', e.progress);
  };

  const transitionFn: ComponentProps<typeof Swiper> = {
    onSlideNextTransitionStart: () =>
      console.log('slide next transition start'),
    onSlidePrevTransitionStart: () =>
      console.log('slide prev transition start'),
    onSlideNextTransitionEnd: () => console.log('slide next transition end'),
    onSlidePrevTransitionEnd: () => console.log('slide prev transition end'),
    // NOTE: 这是一个总的transition结束的回调
    onSlideChangeTransitionEnd: () =>
      console.log('slide change transition end'),
  };

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      // 间距
      spaceBetween={50}
      slidesPerView={1}
      // 速度，值越大越慢
      // speed={1000}
      /**
       * 导航
       * 展示左右导航按钮
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
      // onSwiper={onSwiper}

      /**
       * 进度
       */
      onProgress={onProgress}
    >
      {content}
    </Swiper>
  );
};

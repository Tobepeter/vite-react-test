import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// 引入 Swiper 样式
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const SwiperSimple = () => {
  const colors = ['#f1f1f1', '#e1e1e1', '#d1d1d1', '#c1c1c1']
  const content = []
  for (let i = 0; i < 10; i++) {
    const color = colors[i % colors.length]
    content.push(
      <SwiperSlide key={i}>
        <div style={{ height: '300px', background: color }}>Slide {i}</div>
      </SwiperSlide>
    )
  }

  /**
   * 工作原理
   *
   * swiper-wrapper 使用了flex布局，overflow hidden
   * 默认 flex-direction: row
   * 默认 flex-wrap: nowrap（没有设置就是这个值）
   *
   * 所有的子项自适应父容器的最大宽度（显示设置）
   * 通过给 swiper-wrapper 设置 transform: translateX 来实现偏移
   */

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      // speed={3000}
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      // NOTE: 这个我感觉应该是水平和垂直变化的时候触发
      // onChangeDirection={() => console.log('change direction')}

      // NOTE: 这个测试好像和windows的自己的旋转无关
      // onOrientationchange={() => console.log('orientation change')}
      onSwiper={swiper => console.log(swiper)}
    >
      {content}
    </Swiper>
  )
}

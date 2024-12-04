import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// 引入 Swiper 样式
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const SwiperInitialSlide = () => {
  const swiperRef = useRef<SwiperClass>(null)

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

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 't') {
        const swiper = swiperRef.current
        // NOTE: 可以指定速度，如果是0，可以瞬间切换
        swiper.slideTo(swiper.activeIndex + 1, 0)
        console.log('swiper length', swiper.slides.length)
      }
    })
  }, [])

  return (
    <Swiper
      // NOTE: 如果超出范围，会自动clampo
      // initialSlide={100}
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      speed={3000}
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      // NOTE: 这个我感觉应该是水平和垂直变化的时候触发
      // onChangeDirection={() => console.log('change direction')}

      // NOTE: 这个测试好像和windows的自己的旋转无关
      // onOrientationchange={() => console.log('orientation change')}
      onSwiper={(swiper) => {
        swiperRef.current = swiper
      }}
    >
      {content}
    </Swiper>
  )
}

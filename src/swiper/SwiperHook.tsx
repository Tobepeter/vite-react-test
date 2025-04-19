import { Random } from 'mockjs'
import { SwiperSlide, Swiper, useSwiperSlide, SwiperClass } from 'swiper/react'

// NOTE: 貌似是必须引入的，如果不引入，没有滑动的样式
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { useHotkeys } from 'react-hotkeys-hook'

export const SwiperHook = () => {
  const count = 3
  const swiperRef = useRef<SwiperClass>()

  const Slide = ({ index }: { index: number }) => {
    const swiperSlide = useSwiperSlide()

    useEffect(() => {
      // NOTE: 经过测试，不用等到动画结束，就可以获取到 isActive 的值
      // console.log(`[${index}]: `, swiperSlide.isActive);
      //
      // NOTE: 这个其实就是相对于isActive而言的值
      // console.log(
      //   `[${index}]: prev: ${swiperSlide.isPrev}, next: ${swiperSlide.isNext}`
      // );
    }, [swiperSlide])

    return <div style={{ height: 200, background: Random.color() }}>Slide {index}</div>
  }

  // arrow
  useHotkeys('left', () => {
    swiperRef.current.slidePrev()
  })

  useHotkeys('right', () => {
    swiperRef.current.slideNext()
  })

  // t for test
  useHotkeys('space', () => {
    // NOTE: 经过测试，这个值会自动clamp，比如-1会到0, >=count会到count-1
    // swiperRef.current.slideTo(3);
    // NOTE: 这个不知道为啥，使用超范围的值会broken了，导航失效了
    // swiperRef.current.slideToLoop(-1);
  })

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation={true}
      // speed={10000}
      slidesPerView={1}
      loop={true}
      onSwiper={swiper => {
        swiperRef.current = swiper
      }}
    >
      {[...Array(count)].map((_, index) => (
        <SwiperSlide key={index}>
          <Slide index={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

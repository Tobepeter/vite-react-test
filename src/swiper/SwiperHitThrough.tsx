import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// 引入 Swiper 样式
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

/**
 * 点击穿透测试
 *
 * 1. Swiper如果使用绝对定位，是会挡住后面的内容的点击的
 * 2. Swiper内的内容是可以交互的
 * 3. Swiper内添加内容，如果内容没有被SwiperSlide包裹，是不会受到滚动的
 * 4. Swiper可以添加一些非SwiperSlide包裹的，如果浮在上面，会遮挡Swiper的点击交互
 */
export const SwiperHitThrough = () => {
  const showSwiper = true
  const [msg, setMsg] = useState('debug 信息')
  const swiperRef = useRef<SwiperClass>(null)

  const onClickButton = () => {
    setMsg('点击' + Date.now())
  }

  const tailwindColors = ['bg-red-500', 'bg-green-500', 'bg-blue-500']
  const sliderContent = []
  for (let i = 0; i < 3; i++) {
    const color = tailwindColors[i % tailwindColors.length]
    sliderContent.push(
      <SwiperSlide key={i}>
        <div
          className={`h-full w-full flex flex-col items-center justify-center ${color} bg-opacity-50`}
        >
          <input type="checkbox" id={`slide-${i}`} />
          <label className="user-select-none" htmlFor={`slide-${i}`}>
            Slide {i}
          </label>
          <button
            className="bg-white"
            onClick={(e) => {
              /**
               * 点击阻止滑动设计
               * 貌似 Swiper 没有做类似设计，chrome是有的，点击时候preventDefault会阻止浏览器滚动
               */
              e.stopPropagation()
              e.preventDefault()
              onClickButton()
            }}
            onClickCapture={(e) => {
              e.stopPropagation()
              onClickButton()
            }}
          >
            点击
          </button>
        </div>
      </SwiperSlide>
    )
  }

  const test_body_click = true
  useEffect(() => {
    if (!test_body_click) return
    document.body.addEventListener('touchstart', () => {
      console.log('body touch start')
    })
    document.body.addEventListener('pointerdown', () => {
      console.log('body pointer down')
    })
    return () => {
      document.body.removeEventListener('touchstart', () => {})
      document.body.removeEventListener('pointerdown', () => {})
    }
  }, [])

  const getSliderWrapBtn = () => {
    return (
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        onPointerDown={(e) => {
          console.log('swiper inner btn wrapper pointer down')
        }}
        onTouchStart={(e) => {
          console.log('swiper inner btn wrapper touch start')
        }}
      >
        <button
          className="mt-[150px] ml-[10px]"
          onPointerDown={(e) => {
            console.log('swiper inner btn pointer down')
          }}
          onTouchStart={(e) => {
            console.log('swiper inner btn touch start')
          }}
        >
          Swiper内浮层点击
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mt-4 ml-4 flex flex-col">
        <div>{msg}</div>
        <div className="mt-4">
          <input type="checkbox" id="clickable" />
          <label className="user-select-none" htmlFor="clickable">
            点击后层
          </label>
        </div>
      </div>

      {/* NOTE: Swiper本身会设置position: relative */}
      {/* 注意如果使用绝对定定位，必须设置宽度，默认宽度是由内容决定了 */}
      {showSwiper && (
        <div className="absolute top-0 left-0 w-full h-full">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper

              // NOTE: 找了好久终于找到，可以点击浮层同时slide的代码了 T T
              swiper.params.touchEventsTarget = 'container'

              win.swiper = swiper
              win.swiperRef = swiperRef
            }}
            className="h-full w-full"
            modules={[Navigation, Pagination]}
            // spaceBetween={50}
            slidesPerView={1}
            navigation
            // style={{ pointerEvents: 'none' }}

            /**
             * 关于 onPointerDown
             *
             * 貌似内部没有适配，不会派发，毕竟不是原生事件
             */
            onPointerDown={(e) => {
              console.log('swiper pointer down')
            }}
            /**
             * 关于 onTouchStart
             *
             * 内部有适配，可以派发
             * 但是很奇怪， 如果点击上层的浮层，是不可以触发的
             */
            onTouchStart={(e) => {
              console.log('swiper touch start')
            }}
            // speed={3000}
            // pagination={{ clickable: true }}
            // onSlideChange={() => console.log('slide change')}
            // NOTE: 这个我感觉应该是水平和垂直变化的时候触发
            // onChangeDirection={() => console.log('change direction')}
            // NOTE: 这个测试好像和windows的自己的旋转无关
            // onOrientationchange={() => console.log('orientation change')}
          >
            {sliderContent}
            {getSliderWrapBtn()}
          </Swiper>
        </div>
      )}

      <div className="mt-4 ml-4">
        <input type="checkbox" id="clickable" />
        <label className="user-select-none" htmlFor="clickable">
          点击前层
        </label>
      </div>
    </div>
  )
}

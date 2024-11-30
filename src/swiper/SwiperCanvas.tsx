import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { throttle } from 'lodash-es';
import { Random } from 'mockjs';

export const SwiperCanvas = () => {
  const count = 3;

  const refObj = useRef({
    swiper: null,
    firstSlide: null,
    canvas: null,

    cssWidth: 0,
    cssHeight: 0,
    dpr: 0,
    width: 0,
    height: 0,
  });

  // TEST
  win.refObj = refObj.current;
  console.log('refObj', refObj.current);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    refObj.current.canvas = canvas;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    refObj.current.firstSlide.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const rectCount = 100;
    const rectInfos: {
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
    }[] = [];

    const draw = () => {
      for (let i = 0; i < rectCount; i++) {
        const info = rectInfos[i];
        let x = Random.float(0, refObj.current.width);
        let y = Random.float(0, refObj.current.height);
        let w = Random.float(10, 100);
        let h = Random.float(10, 100);
        let color = Random.color();
        if (info) {
          x = info.x;
          y = info.y;
          w = info.w;
          h = info.h;
          color = info.color;
        } else {
          rectInfos[i] = { x, y, w, h, color };
        }
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
      }
    };

    const resizeCanvas = () => {
      refObj.current.cssWidth = window.innerWidth;
      refObj.current.cssHeight = window.innerHeight;
      refObj.current.dpr = window.devicePixelRatio;
      refObj.current.width = Math.floor(
        refObj.current.cssWidth * refObj.current.dpr
      );
      refObj.current.height = Math.floor(
        refObj.current.cssHeight * refObj.current.dpr
      );
      refObj.current.canvas.width = refObj.current.width;
      refObj.current.canvas.height = refObj.current.height;
      refObj.current.canvas.style.width = `${refObj.current.cssWidth}px`;
      refObj.current.canvas.style.height = `${refObj.current.cssHeight}px`;

      draw();
    };

    resizeCanvas();

    const throttleResizeCanvas = throttle(resizeCanvas, 100);
    window.addEventListener('resize', throttleResizeCanvas);

    draw();

    // TEST
    win.canvas = canvas;

    canvas.addEventListener('pointerdown', (e) => {
      console.log('canvas pointerdown', e);
    });

    return () => {
      window.removeEventListener('resize', throttleResizeCanvas);
      refObj.current.canvas.remove();
    };
  }, []);

  const getSliderContent = () => {
    const content = [];
    for (let i = 0; i < count; i++) {
      content.push(
        <SwiperSlide className="w-full h-full" key={i}>
          <div
            ref={i === 0 ? (el) => (refObj.current.firstSlide = el) : null}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          >
            Slide{i}
          </div>
        </SwiperSlide>
      );
    }
    return content;
  };

  /**
   * 使用progres
   *
   * TODO：目前有一个bug，就是松手的时候，progress直接就是目标值了
   * 过渡是通过CSS-transition实现的
   */
  const onSwiperProgress = (swiper: SwiperClass) => {
    console.log('swiper progress', swiper.progress);
    const maxWidth = refObj.current.cssWidth * (count - 1);
    const translateX = swiper.progress * maxWidth;
    const canvas = refObj.current.canvas;
    // NOTE: 默认刚进来会触发一次，这个时候还没有canvas
    if (canvas) {
      canvas.style.transform = `translateX(${translateX}px)`;
    }
  };

  /**
   * 实时去计算 translateX
   *
   * 实际上还是有问题，canvas点击不会考虑translate的
   */
  useEffect(() => {
    let rafId = -1;

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      const swiper = refObj.current.swiper;
      if (swiper) {
        // 读取的是一个 matrix，如 'matrix(1, 0, 0, 1, 0, 0)'
        const transform = getComputedStyle(swiper.wrapperEl).transform;
        let translateXStr = transform.split(',')[4].trim();
        let translateX = parseFloat(translateXStr);
        if (isNaN(translateX)) {
          translateX = 0;
          console.error('translateX is NaN');
        }
        translateX = -translateX;
        // console.log('translateX', translateX);
        refObj.current.canvas.style.transform = `translateX(${translateX}px)`;
      }
    };
    loop();

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="w-full h-full absolute top-0 left-0">
      <Swiper
        speed={3000}
        className="h-full"
        onSwiper={(swiper) => (refObj.current.swiper = swiper)}
        modules={[Navigation]}
        navigation
        // onProgress={onSwiperProgress}
      >
        {getSliderContent()}
      </Swiper>
    </div>
  );
};

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}

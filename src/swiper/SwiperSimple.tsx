import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// 引入 Swiper 样式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const SwiperSimple = () => {
  const colors = ["#f1f1f1", "#e1e1e1", "#d1d1d1", "#c1c1c1"];
  const content = [];
  for (let i = 0; i < 10; i++) {
    const color = colors[i % colors.length];
    content.push(
      <SwiperSlide key={i}>
        <div style={{ height: "300px", background: color }}>Slide {i}</div>
      </SwiperSlide>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {content}
    </Swiper>
  );
};

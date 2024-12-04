import { SwiperCallback } from './SwiperCallback'
import { SwiperCanvas } from './SwiperCanvas'
import { SwiperHitThrough } from './SwiperHitThrough'
import { SwiperHook } from './SwiperHook'
import { SwiperInitialSlide } from './SwiperInitialSlide'
import { SwiperSimple } from './SwiperSimple'

export const SwiperDemo = () => {
  // return <SwiperSimple />;
  return <SwiperCallback />
  // return <SwiperHook />;
  // return <SwiperHitThrough />;
  // return <SwiperCanvas />;
  // return <SwiperInitialSlide />;
}

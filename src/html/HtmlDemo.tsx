import { HtmlOrientation } from './orientation/HtmlOrientation'
import { HtmlCustomScroll } from './scroll/custom/HtmlCustomScroll'
import { LockScroll } from './scroll/lock/LockScroll'
import { HtmlCustomScroll as HtmlCustomScrollNoTailwind } from './scroll/no-tailwind/HtmlCustomScroll'
import { HtmlTransform } from './transform/HtmlTransform'

export const HtmlDemo = () => {
  // return <HtmlOrientation />
  // return <HtmlTransform />
  // return <HtmlCustomScroll />
  // return <HtmlCustomScrollNoTailwind />
  return <LockScroll />
}

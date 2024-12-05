import { loadAnimation, AnimationManager } from 'lottie-pixi'
import lottie from 'lottie-web'
import { Container } from 'pixi.js'
import { ITest } from '../../util/ITest'
import MoneyRing from './assets/MoneyRing.json'
import { hmr } from '../../util/Hmr'

/**
 * pixilottie
 */
class PixiLottie implements ITest {
  animationManager: AnimationManager

  init() {
    // this.init_pixilottie()
    this.init_lottieweb_canvas()
  }

  init_pixilottie() {
    this.init_pixilottie_Manager()

    const anim = this.animationManager.parseAnimation({
      keyframes: MoneyRing,
    })
    pixiEntry.root.addChild(anim.group)
  }

  @hmr.oneCall
  init_pixilottie_Manager() {
    this.animationManager = new AnimationManager(pixiEntry.app)
  }

  init_lottieweb_canvas() {
    const container = document.createElement('div')
    container.id = 'lottie-container'
    container.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `
    document.body.appendChild(container)

    const animation = lottie.loadAnimation({
      container,
      renderer: 'canvas', // svg或者canvas
      loop: true,
      autoplay: true,
      animationData: MoneyRing,
    })

    // const canvas = animation.renderer.canvas
    // canvas.style.cssText = `
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    // `
  }
}

export const pixiLottie = new PixiLottie()

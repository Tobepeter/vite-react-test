import { DisplayObject, Matrix } from 'pixi.js'

class TransUtil {
  getRelativeMatrix(from: DisplayObject, to: DisplayObject) {
    from.updateTransform()
    to.updateTransform()

    const fromMatrix = from.worldTransform
    const toMatrix = to.worldTransform
    const result = new Matrix()
    result.copyFrom(toMatrix)
    result.invert()
    result.append(fromMatrix)
    return result
  }
}

export const transUtil = new TransUtil()

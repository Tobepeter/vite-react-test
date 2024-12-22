import { Bounds, DisplayObject, Matrix, Point, Rectangle } from 'pixi.js'

class BoundUtil {
  /**
   * 获取obj的父级rect
   * getLocalBounds 只是获取自身坐标系的
   */
  getParentRect(obj: DisplayObject) {
    // NOTE: pixi 命名上是 bounds，实际上是 rect
    //  getLocalBounds 会计算vertex时候直接考虑了anchor，后续不需要考虑anchor导致的坐标影响了
    const rect = obj.getLocalBounds()

    // 1. 对象刚创建时候，localTransform 是一定是最新的
    // 2 getLocalBounds 会 dirty localTransform
    obj.updateTransform()

    const result = this.transformRect(rect, obj.localTransform)

    console.log('getParentRect', result)
    return result
  }

  getParentBound(obj: DisplayObject) {
    const rect = this.getParentRect(obj)
    return this.rect2Bounds(rect)
  }

  /**
   * 变换bound
   *
   * 理论上这么常见的方法应该是有的，但是pixi我找不到，如果有可以删掉了
   */
  transformBound(bound: Bounds, matrix: Matrix) {
    const tl = new Point(bound.minX, bound.minY)
    const tr = new Point(bound.maxX, bound.minY)
    const bl = new Point(bound.minX, bound.maxY)
    const br = new Point(bound.maxX, bound.maxY)

    const tlPoint = matrix.apply(tl)
    const trPoint = matrix.apply(tr)
    const blPoint = matrix.apply(bl)
    const brPoint = matrix.apply(br)

    const result = new Bounds()
    result.addPoint(tlPoint)
    result.addPoint(trPoint)
    result.addPoint(blPoint)
    result.addPoint(brPoint)

    return result
  }

  transformRect(rect: Rectangle, matrix: Matrix) {
    const bound = this.rect2Bounds(rect)
    const result = this.transformBound(bound, matrix)
    return this.bounds2Rect(result)
  }

  rect2Bounds(rect: Rectangle) {
    const result = new Bounds()
    result.addPoint(new Point(rect.x, rect.y))
    result.addPoint(new Point(rect.x + rect.width, rect.y + rect.height))
    return result
  }

  bounds2Rect(bounds: Bounds) {
    const width = bounds.maxX - bounds.minX
    const height = bounds.maxY - bounds.minY
    return new Rectangle(bounds.minX, bounds.minY, width, height)
  }
}

export const boundUtil = new BoundUtil()

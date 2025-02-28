/**
 * 接雨水算法
 * @param heightList 高度列表
 * @returns number 接到的雨水量
 *
 * -- 单调梯度 --
 * 基本形状是v自行，如果有多个，其实可以组合为多个v的组合
 * v所能接到的雨水是最小的一个边
 *
 * -- 回溯 --
 * 如果是梯度 4 3 1 2 5
 * 取最大值 4，每个值 4 - x，大于 0部分累计即为高度
 *
 */
export const algorithm_trapWater = (heightList: number[]) => {
  let total = 0
  let step = 0 // 0 初始值，1 开始下降，2 开始上升
  let pre = heightList[0] // 前一个数据，方便判断上升和下降
  let left = -1 // 缓存left，方便上升时候提前退出
  let leftIndex = -1 // 当找到最大v时，需要回溯
  let j = 0
  let referHeight = -1
  let delta = 0
  const len = heightList.length

  for (let i = 1; i < heightList.length; i++) {
    // 边缘情况，到达末尾并且上升，强制回溯并退出
    if (i === len - 1) {
      if (step === 2) {
        referHeight = Math.min(heightList[i], left)
        j = leftIndex + 1
        while (j < i) {
          delta = referHeight - heightList[j]
          if (delta > 0) {
            total += delta
          }
          j++
        }
      }
      break
    }

    // -- 上升阶段 --
    if (heightList[i] >= pre) {
      // 未曾下降，当前点无效
      if (step === 0) {
        pre = heightList[i]
        continue
      }

      // 下降结束了，标记开始上升
      if (step === 1) {
        step = 2
        pre = heightList[i]
        continue
      }

      // 这里自由上升
      pre = heightList[i]

      // 如果当前值>=left，按照left结算
      if (pre >= left) {
        referHeight = heightList[leftIndex]
        j = leftIndex + 1 // 额外加1，因为边缘没必要
        while (j < i) {
          total += referHeight - heightList[j]
          j++
        }
        step = 0
        left = heightList[i]
        leftIndex = i
      }

      continue
    }

    // -- 下降阶段 --
    // 未曾下降，标记，并记录左值
    if (step === 0) {
      step = 1
      left = pre
      leftIndex = i - 1
      pre = heightList[i]
      continue
    }

    // 如果上升阶段，遇到下降，开始结算
    if (step === 2) {
      pre = heightList[i]
      referHeight = pre

      j = leftIndex + 1 // 额外加1，因为边缘没必要
      while (j < i) {
        delta = referHeight - heightList[j]
        if (delta > 0) {
          total += delta
        }
        j++
      }

      step = 0
      left = heightList[i]
      leftIndex = i
      continue
    }

    // 继续下降
    pre = heightList[i]
  }

  return total
}

export const AlgorithmTrapWater = () => {
  const testList = [4, 3, 1, 2, 5, 4, 3, 2, 1, 2, 3, 4, 5]

  useEffect(() => {
    const total = algorithm_trapWater(testList)
    console.log(`input: ${testList.join(',')}, output: ${total}`)
  }, [])

  return <div>AlgorithmTrapWater</div>
}

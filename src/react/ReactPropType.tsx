import { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * React PropType
 *
 * React15及以前,propTypes 是 React 内置的（早期是 JavaScript 的时代）
 * 现在需要自行安装
 */
export const ReactPropType = () => {
  class MyCls extends Component {
    // NOTE: 如果不传递正确的prop，会出现
    // Warning: Failed prop type: The prop `name` is marked as required in `MyCls`, but its value is `undefined`.
    static propTypes = {
      name: PropTypes.string.isRequired,
    }

    render() {
      return <div>MyCls</div>
    }
  }

  return (
    <div>
      {/* <MyCls name="test" /> */}
      <MyCls />
    </div>
  )
}

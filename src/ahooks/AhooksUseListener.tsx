import { useEventListener } from 'ahooks'

export const AhooksUseListener = () => {
  useEventListener('visibilitychange', e => {
    // NOTE: 经过测试，默认的target是document
    console.log('hidden: ', document.hidden)
    console.log('event: ', e)
  })

  return <div>AhooksUseListener</div>
}

import { Button } from 'antd'
import { Random } from 'mockjs'
import { fetchMap } from './fetchMap'

/**
 * 测试Fetch功能
 */
export const JSFetchSimple = () => {
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [now, setNow] = useState(Date.now())

  // 解决闭包问题
  const loadingRef = useRef(false)
  loadingRef.current = loading

  const test_fetch = () => {
    // const url = Random.pick(Object.values(fetchMap))

    // NOTE: 浏览器会感知到断网情况，所以自己搭建了一个服务功能来测试延迟功能
    // const delay = 60 * 1000
    const delay = 60 * 2 * 1000
    const url = `http://localhost:3000/api/delay/${delay}`

    setUrl(url)
    setLoading(true)
    setStartTime(Date.now())
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setData(data)
      })
      .catch(error => {
        console.error(error)
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    test_fetch()

    let rafId: number
    const updateNow = () => {
      if (loadingRef.current) {
        setNow(Date.now())
      }
      rafId = requestAnimationFrame(updateNow)
    }
    rafId = requestAnimationFrame(updateNow)

    updateNow()

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div>
      <div>JSFetch</div>
      <div>
        <Button onClick={test_fetch}>test_fetch</Button>
      </div>
      <div>url: {url}</div>
      {/* <div>data: {JSON.stringify(data)}</div> */}
      <div>error: {JSON.stringify(error)}</div>
      <div>loading: {JSON.stringify(loading)}</div>
      {startTime > 0 && <div>loadingTime: {((now - startTime) / 1000).toFixed(2)}s</div>}
    </div>
  )
}

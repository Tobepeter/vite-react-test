import { debugVisual } from './debug/DebugVisual'
import { scriptLoader } from './ScriptLoader'

export const usePromise = <T>(promise: Promise<T>) => {
  const [data, setData] = useState<T | null>(null)
  useEffect(() => {
    promise.then(setData)
  }, [promise])

  return data
}

export const useLoad = (promise: Promise<any>) => {
  const [isLoad, setIsLoad] = useState(false)
  promise.then(() => setIsLoad(true))
  return isLoad
}

type LoadInfo<T> = {
  data: T
  isLoad: boolean
  error: Error
  errorMsg: string
}

export const useLoadInfo = <T>(promise: Promise<T>): LoadInfo<T> => {
  const [info, setInfo] = useState<LoadInfo<T>>({
    data: null,
    isLoad: false,
    error: null,
    errorMsg: '',
  })
  promise.then(data => setInfo({ data, isLoad: true, error: null, errorMsg: '' })).catch(error => setInfo({ data: null, isLoad: true, error, errorMsg: error.message }))

  return info
}

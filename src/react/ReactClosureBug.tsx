const globalState = {
  count: 0,
}

export const ReactClosureBug = () => {
  const { count } = globalState

  // NOTE: 这个一般是其他地方改的，为了方便边写到了这里
  useEffect(() => {
    setTimeout(() => {
      globalState.count++
    }, 1)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      // console.log(globalState.count)
      console.log(count)
    }, 1000)
  }, [])

  return <div>ReactClosureBug</div>
}

export const ViteImportGlob = () => {
  useEffect(() => {
    // NOTE: 注意 glob 的内容只能使用内联，不能抽取const变量
    //  但是可以使用字符串拼接
    const res = import.meta.glob('/src/assets/test.json', {
      eager: true,
    })
    console.log(res)

    // NOTE: 能够获取直接对象，同时兼容default，访问自身
    console.log(res['/src/assets/test.json'])
  }, [])

  return <div>ViteImportGlob</div>
}

export const ReactWhiteSpace = () => {
  // NOTE: 如果有多个空白，还是会别压缩为一个，要使用css来进行处理
  const str = '  你   好   '
  return (
    <div>
      <div>{str}</div>
      <div style={{ whiteSpace: 'pre' }}>{str}</div>
    </div>
  )
}

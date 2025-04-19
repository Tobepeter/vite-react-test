import { Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

export const FileUpload = (props: FileUploadProps) => {
  const isDark = true

  const textColor = isDark ? '#fff' : '#000'
  const backgroundColor = 'rgba(255, 255, 255, 0.3)'

  return (
    <div className='height-[60px] absolute right-[24px] bottom-[24px]'>
      <Upload.Dragger
        showUploadList={false}
        accept='.jpg,.jpeg,.png'
        beforeUpload={() => false}
        onChange={info => {
          console.log('info', info)
          props.onFileChange?.(info.file as unknown as File)
        }}
        style={{
          width: 200,
          height: 60,
          padding: '8px',
          backgroundColor,
        }}
        maxCount={1}
      >
        <p style={{ margin: 0, color: textColor }}>拖拽文件到这里</p>
      </Upload.Dragger>
    </div>
  )
}

export type FileUploadProps = {
  onFileChange?: (file: File) => void
}

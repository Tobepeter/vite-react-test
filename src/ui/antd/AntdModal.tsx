import { Modal, Typography } from 'antd'

const { Text } = Typography

export const AntdModal = () => {
  return (
    <Modal open={true} onCancel={() => {}}>
      <Typography.Text>Hello</Typography.Text>
    </Modal>
  )
}

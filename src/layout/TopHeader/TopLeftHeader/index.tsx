import { Space } from 'antd'
import Epoch from './Epoch'
import Heading from './Heading'

function TopLeftHeader() {
  return (
    <Space size={30} align="center">
      <Heading />
      <Epoch />
    </Space>
  )
}

export default TopLeftHeader

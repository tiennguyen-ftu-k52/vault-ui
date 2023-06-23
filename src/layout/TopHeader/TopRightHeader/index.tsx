import { Row, Space } from 'antd'
import { Clock, Setting2 } from 'iconsax-react'
import ButtonIcon from '@components/ButtonIcon'
import ConnectWallet from './ConnectWallet'

function TopRightHeader() {
  return (
    <Row align="middle" justify="center">
      <Space size={8}>
        <ButtonIcon icon={<Clock size="20" />} />
        <ButtonIcon icon={<Setting2 size="20" />} />
        <ConnectWallet />
      </Space>
    </Row>
  )
}

export default TopRightHeader

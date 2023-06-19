import { Layout } from 'antd'
import TopLeftHeader from './TopLeftHeader'
import TopRightHeader from './TopRightHeader'

const { Header } = Layout

function TopHeader() {
  return (
    <Header
      style={{
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(248, 248, 255, 0.8)',
      }}
    >
      <TopLeftHeader />
      <TopRightHeader />
    </Header>
  )
}

export default TopHeader

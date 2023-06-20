import { Layout } from 'antd'
import TopLeftHeader from './TopLeftHeader'
import TopRightHeader from './TopRightHeader'
import styles from './index.module.scss'

const { Header } = Layout

function TopHeader() {
  return (
    <Header className={styles.header}>
      <TopLeftHeader />
      <TopRightHeader />
    </Header>
  )
}

export default TopHeader

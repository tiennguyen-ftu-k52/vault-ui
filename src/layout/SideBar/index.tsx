import { Layout } from 'antd'
import Logo from './Logo'
import Menu from './Menu'
import styles from './index.module.scss'

const { Sider } = Layout

const SIDER_WIDTH = 74

function SideBar() {
  return (
    <Sider collapsed collapsedWidth={SIDER_WIDTH} className={styles.sider}>
      <Logo />
      <Menu />
    </Sider>
  )
}

export default SideBar

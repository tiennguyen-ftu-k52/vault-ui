import { Layout, theme } from 'antd'
import Logo from './Logo'
import SideBarMenu from './SideBarMenu'

const { Sider } = Layout

function SideBar() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Sider
      collapsed
      collapsedWidth={74}
      style={{ backgroundColor: colorBgContainer, border: '1px solid #fff' }}
    >
      <Logo />
      <SideBarMenu />
    </Sider>
  )
}

export default SideBar

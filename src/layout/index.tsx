import React from 'react'
import { Layout as AntLayout } from 'antd'
import SideBar from './SideBar'
import styles from './index.module.scss'
import TopHeader from './TopHeader'

const { Content } = AntLayout

interface Props {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <AntLayout className={styles.layout}>
      <SideBar />
      <AntLayout className={styles.main}>
        <div className={styles.background} />
        <div className={styles.topHeader}>
          <TopHeader />
        </div>
        <Content className={styles.content}>{children}</Content>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout

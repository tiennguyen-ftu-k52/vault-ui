import { useState } from 'react'
import { Row, Space } from 'antd'
import cs from 'classnames'
import VaultOverview from './VaultOverview'
import YourRequest from './YourRequest'
import styles from './index.module.scss'
import { UseWithdrawRequests } from '../../../hooks/useWithdrawRequests'

const TAB_ITEMS = [
  {
    label: 'Overview',
    value: 'overview',
  },
  {
    label: 'Your request',
    value: 'your-request',
  },
  {
    label: 'Your lock',
    value: 'your-lock',
  },
]

interface Props {
  withdrawRequestsData: UseWithdrawRequests
}

function VaultTabs({ withdrawRequestsData }: Props) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className={styles.container}>
      <Row className={styles.tabContainer}>
        <Space size={32}>
          {TAB_ITEMS.map((item) => (
            <a
              key={item.value}
              className={cs(
                styles.tab,
                activeTab === item.value && styles.tabActive,
              )}
              onClick={() => setActiveTab(item.value)}
            >
              {item.label}
            </a>
          ))}
        </Space>
      </Row>

      {activeTab === 'overview' && <VaultOverview />}
      {activeTab === 'your-request' && (
        <YourRequest withdrawRequestsData={withdrawRequestsData} />
      )}
    </div>
  )
}

export default VaultTabs

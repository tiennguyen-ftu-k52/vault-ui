import { useState } from 'react'
import { Row, Space } from 'antd'
import cs from 'classnames'
import { ReactComponent as AutoRefreshIcon } from '../../../assets/icons/auto-refresh.svg'
import { ReactComponent as TokenHeadColor } from '../../../assets/icons/token-head-color.svg'

import styles from './index.module.scss'

const TAB_ITEMS = [
  {
    label: 'DEPOSIT',
    value: 'deposit',
  },
  {
    label: 'WITHDRAW',
    value: 'withdraw',
  },
  {
    label: 'UNLOCK',
    value: 'unlock',
  },
]

function OrderBox() {
  const [activeTab, setActiveTab] = useState('deposit')

  return (
    <>
      <div className={styles.actionContainer}>
        <div className={styles.tabContainer}>
          <div className={styles.leftTabs}>
            <Space size={24}>
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
          </div>
          <a className={styles.refreshButton}>
            <AutoRefreshIcon className={styles.refreshIcon} />
          </a>
        </div>

        <div className={styles.boxContainer}>
          <div>
            <Row align="middle" justify="space-between">
              <div>
                <div className={styles.boxTitle}>Deposit</div>
                <div className={styles.boxSubtitle}>
                  <TokenHeadColor />
                </div>
              </div>
            </Row>
          </div>
        </div>
      </div>

      <div className={styles.detailContainer}></div>
    </>
  )
}

export default OrderBox

import { Space } from 'antd'
import cs from 'classnames'
import { ReactComponent as AutoRefreshIcon } from '../../../../assets/icons/auto-refresh.svg'
import styles from './index.module.scss'

interface TabItem {
  label: string
  value: string
}

interface Props {
  items: TabItem[]
  activeTab: string
  setActiveTab: (activeTab: string) => void
}

function ActionTabs({ activeTab, setActiveTab, items }: Props) {
  return (
    <div className={styles.tabContainer}>
      <div className={styles.leftTabs}>
        <Space size={24}>
          {items.map((item) => (
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
  )
}

export default ActionTabs

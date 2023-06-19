import { useState } from 'react'
import { Col, Row, Space } from 'antd'
import cs from 'classnames'
import vaultGraph from '../../../assets/images/vault-graph.svg'
import styles from './index.module.scss'
import PrimaryButton from '../../../components/PrimaryButton'

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

function VaultOverview() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className={styles.container}>
      <Row>
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

      <Row justify="center" align="middle">
        <Col xs={24} md={12}>
          <div className={styles.title}>
            54.02%
            <br />
            APR
          </div>
          <PrimaryButton className={styles.button}>DEPOSIT</PrimaryButton>
        </Col>
        <Col xs={24} md={12}>
          <img src={vaultGraph} alt="vault graph" />
        </Col>
      </Row>

      <div className={styles.platformStats}>
        <div className={styles.statsTitle}>Platform stats</div>

        <Row>
          <Col xs={24} md={6}>
            <div className={styles.statLabel}>TVL</div>
            <div className={styles.statValue}>36,523,608</div>
          </Col>
          <Col xs={24} md={6}>
            <div className={styles.statLabel}>Collat Ratio</div>
            <div className={styles.statValue}>109.35%</div>
          </Col>
          <Col xs={24} md={6}>
            <div className={styles.statLabel}>gDAI Price</div>
            <div className={styles.statValue}>1.000003</div>
          </Col>
          <Col xs={24} md={6}>
            <div className={styles.statLabel}>gDAI Supply</div>
            <div className={styles.statValue}>341,341,988</div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default VaultOverview

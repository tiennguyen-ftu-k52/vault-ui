import { Col, Row } from 'antd'
import styles from './index.module.scss'

function StatCol({ label, value }: { label: string; value: string }) {
  return (
    <Col xs={24} md={6}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
    </Col>
  )
}

function PlatformStats() {
  return (
    <div className={styles.platformStats}>
      <div className={styles.statsTitle}>Platform stats</div>

      <Row>
        <StatCol label="TVL" value="36,523,608" />
        <StatCol label="Collat Ratio" value="109.35%" />
        <StatCol label="gDAI Price" value="1.000003" />
        <StatCol label="gDAI Supply" value="341,341,988" />
      </Row>
    </div>
  )
}

export default PlatformStats

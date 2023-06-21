import { Divider, Row } from 'antd'
import cs from 'classnames'
import styles from './index.module.scss'

interface Props {
  title: string
}

function ActionDetails({ title }: Props) {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailHeading}>{title} details</div>
      <Divider style={{ margin: '16px 0' }} />
      <Row className={styles.detailRow} justify="space-between" align="middle">
        <span className={styles.detailLabel}>DAI deposit</span>
        <span className={styles.detailValue}>27342.12 DAI</span>
      </Row>
      <Row className={styles.detailRow} justify="space-between" align="middle">
        <span className={styles.detailLabel}>tvDAI reveice</span>
        <span className={cs(styles.detailValue, styles.detailValueActive)}>
          27342.12 tvDAI
        </span>
      </Row>
      <Row className={styles.detailRow} justify="space-between" align="middle">
        <span className={styles.detailLabel}>Fees</span>
        <span className={styles.detailValue}>20 DAI</span>
      </Row>
    </div>
  )
}

export default ActionDetails

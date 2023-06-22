import { Row, Space } from 'antd'
import cs from 'classnames'
import TokenHeadColorGray from '../../../../assets/icons/token-head-gray.svg'
import styles from './index.module.scss'
import DisplayToken from '../DisplayToken'
import { formatCurrency, formatNumber } from '../../../../utils/number'
import { renderFallback } from '../../../../utils/common'
import { useContractQuery } from '../../../../hooks/useContractQuery'

interface Props {
  amount: string
  title: string
}

function PreviewResult({ amount, title }: Props) {
  const { shareToAssetsPrice } = useContractQuery()

  const numAmount = Number(amount)
  const estValue =
    shareToAssetsPrice !== undefined
      ? numAmount * shareToAssetsPrice
      : undefined

  return (
    <Space size={8} direction="vertical" className={styles.container}>
      <Row className={styles.boxTitle}>{title}</Row>

      <Row align="middle" justify="space-between" className={styles.balanceBox}>
        <div className={cs(styles.boxSubTitle, styles.receiveBoxTitle)}>
          <DisplayToken icon={TokenHeadColorGray} text="DAI" />
        </div>
        <div className={styles.previewResult}>{formatNumber(numAmount)}</div>
      </Row>

      <Row align="middle" justify="end" className={styles.balanceLabel}>
        ~
        {renderFallback(
          estValue !== undefined ? formatCurrency(estValue) : undefined,
        )}
      </Row>
    </Space>
  )
}

export default PreviewResult

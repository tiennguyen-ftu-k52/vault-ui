import { Row, Space } from 'antd'
import cs from 'classnames'
import styles from './index.module.scss'
import DisplayToken from '../DisplayToken'
import { formatCurrency, formatNumber } from '../../../../utils/number'
import { renderFallback } from '../../../../utils/common'
import { useContractQuery } from '../../../../hooks/useContractQuery'
import { SelectOption } from '../../../../interfaces/select'

interface Props {
  amount: string
  title: string
  tokenOption: SelectOption
}

function PreviewResult({ amount, title, tokenOption }: Props) {
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
          <DisplayToken icon={tokenOption.icon} text={tokenOption.label} />
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

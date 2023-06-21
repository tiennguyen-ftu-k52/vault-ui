import { useQuery } from 'react-query'
import { Row } from 'antd'
import cs from 'classnames'
import TokenHeadColorGray from '../../../../assets/icons/token-head-gray.svg'
import styles from './index.module.scss'
import DisplayToken from '../DisplayToken'
import { formatCurrency, formatNumber } from '../../../../utils/number'
import { getShareToAssetsPrice } from '../../../../api/vaultContract'
import { renderFallback } from '../../../../utils/common'

interface Props {
  amount: string
}

function PreviewResult({ amount }: Props) {
  const { data: shareToAssetsPrice } = useQuery<number>({
    queryKey: ['shareToAssetsPrice'],
    queryFn: getShareToAssetsPrice,
  })

  const numAmount = Number(amount)
  const estValue =
    shareToAssetsPrice !== undefined
      ? numAmount * shareToAssetsPrice
      : undefined

  return (
    <Row
      className={styles.previewContainer}
      align="middle"
      justify="space-between"
    >
      <div className={styles.leftInputBox}>
        <div className={styles.boxTitle}>You receive</div>
        <div className={cs(styles.boxSubTitle, styles.receiveBoxTitle)}>
          <DisplayToken icon={TokenHeadColorGray} text="DAI" />
        </div>
      </div>

      <div className={styles.rightInputBox}>
        <div className={styles.previewResult}>{formatNumber(numAmount)}</div>
        <div className={styles.balanceLabel}>
          ~
          {renderFallback(
            estValue !== undefined ? formatCurrency(estValue) : undefined,
          )}
        </div>
      </div>
    </Row>
  )
}

export default PreviewResult

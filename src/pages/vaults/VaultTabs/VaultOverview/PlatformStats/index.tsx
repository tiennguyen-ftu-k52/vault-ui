import { Col, Row } from 'antd'
import styles from './index.module.scss'
import { renderFallback } from '../../../../../utils/common'
import { formatNumber, formatPercentage } from '../../../../../utils/number'
import { useContractQuery } from '../../../../../hooks/useContractQuery'

function StatCol({ label, value }: { label: string; value: string }) {
  return (
    <Col xs={24} md={6}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
    </Col>
  )
}

function PlatformStats() {
  const { collatRatio, totalSupply, shareToAssetsPrice } = useContractQuery()

  const tvl =
    totalSupply !== undefined && shareToAssetsPrice !== undefined
      ? totalSupply * shareToAssetsPrice
      : undefined

  return (
    <div className={styles.platformStats}>
      <div className={styles.statsTitle}>Platform stats</div>

      <Row>
        <StatCol
          label="TVL"
          value={renderFallback(tvl !== undefined ? formatNumber(tvl) : tvl)}
        />
        <StatCol
          label="Collat Ratio"
          value={renderFallback(
            collatRatio !== undefined
              ? formatPercentage(collatRatio * 100)
              : collatRatio,
          )}
        />
        <StatCol
          label="gDAI Price"
          value={renderFallback(
            shareToAssetsPrice !== undefined
              ? formatNumber(shareToAssetsPrice)
              : shareToAssetsPrice,
          )}
        />
        <StatCol
          label="gDAI Supply"
          value={renderFallback(
            totalSupply !== undefined ? formatNumber(totalSupply) : totalSupply,
          )}
        />
      </Row>
    </div>
  )
}

export default PlatformStats

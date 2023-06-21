import { useQuery } from 'react-query'
import { Col, Row } from 'antd'
import styles from './index.module.scss'
import {
  getCollatRatio,
  getShareToAssetsPrice,
  getTotalSupply,
} from '../../../../../api/vaultContract'
import { renderFallback } from '../../../../../utils/common'
import { formatNumber, formatPercentage } from '../../../../../utils/number'

function StatCol({ label, value }: { label: string; value: string }) {
  return (
    <Col xs={24} md={6}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
    </Col>
  )
}

function PlatformStats() {
  const { data: collatRatio } = useQuery<number>({
    queryKey: ['collatRatio'],
    queryFn: getCollatRatio,
  })
  const { data: totalSupply } = useQuery<number>({
    queryKey: ['totalSupply'],
    queryFn: getTotalSupply,
  })
  const { data: shareToAssetsPrice } = useQuery<number>({
    queryKey: ['shareToAssetsPrice'],
    queryFn: getShareToAssetsPrice,
  })

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
              ? formatPercentage(collatRatio)
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

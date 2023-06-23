import TokenGrayIcon from '@assets/icons/token-head-gray.png'
import TokenColorIcon from '@assets/icons/token-head-color.png'
import { formatNumber } from '@utils/number'
import { renderFallback } from '@utils/common'
import { useContractQuery } from '@hooks/useContractQuery'
import styles from './index.module.scss'

function StatRow({
  label,
  value,
  icon,
}: {
  label: string
  value: number | string
  icon: string
}) {
  return (
    <div className={styles.row}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>
        <img src={icon} className={styles.valueIcon} />
        <span className={styles.valueText}>{value}</span>
      </div>
    </div>
  )
}

function YourStats() {
  const { maxAccPnlPerToken, shareToAssetsPrice, shareTokenBalance } =
    useContractQuery()

  const totalValue =
    shareToAssetsPrice !== undefined
      ? shareToAssetsPrice * shareTokenBalance
      : undefined
  const estEarning =
    maxAccPnlPerToken !== undefined
      ? maxAccPnlPerToken * shareTokenBalance
      : undefined

  return (
    <div className={styles.container}>
      <div className={styles.title}>Your stats</div>
      <div className={styles.statContainer}>
        <StatRow
          label="Total deposit & reward"
          value={formatNumber(943392182.92)}
          icon={TokenGrayIcon}
        />
        <StatRow
          label="Locked tvDAI"
          value={formatNumber(39218292)}
          icon={TokenGrayIcon}
        />
        <StatRow
          label="Total value (DAI)"
          value={renderFallback(
            totalValue !== undefined ? formatNumber(totalValue) : totalValue,
          )}
          icon={TokenColorIcon}
        />
        <StatRow
          label="Est. Earnings (DAI)"
          value={renderFallback(
            estEarning !== undefined ? formatNumber(estEarning) : estEarning,
          )}
          icon={TokenColorIcon}
        />
      </div>
    </div>
  )
}

export default YourStats

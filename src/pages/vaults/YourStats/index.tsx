import { useQuery } from 'react-query'
import TokenHeadGrayIcon from '../../../assets/icons/token-head-gray.png'
import TokenHeadColorIcon from '../../../assets/icons/token-head-color.png'
import styles from './index.module.scss'
import {
  getMaxAccPnlPerToken,
  getShareToAssetsPrice,
} from '../../../api/vaultContract'
import {
  useGetAccountInfo,
  useGetNetworkConfig,
} from '@multiversx/sdk-dapp/hooks'
import { getWalletTokens } from '../../../api/wallet'
import { WalletToken } from '../../../interfaces/wallet'
import { getShareTokenBalance } from '../../../utils/wallet'
import { formatNumber } from '../../../utils/number'
import { renderFallback } from '../../../utils/common'

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
  const { data: maxAccPnlPerToken } = useQuery<number>({
    queryKey: ['maxAccPnlPerToken'],
    queryFn: getMaxAccPnlPerToken,
  })
  const { data: shareToAssetsPrice } = useQuery<number>({
    queryKey: ['shareToAssetsPrice'],
    queryFn: getShareToAssetsPrice,
  })

  const {
    network: { apiAddress },
  } = useGetNetworkConfig()
  const { address } = useGetAccountInfo()
  const { data: tokens } = useQuery<WalletToken[]>({
    queryKey: ['tokens', apiAddress],
    queryFn: () => getWalletTokens(apiAddress, address),
    enabled: !!apiAddress,
  })

  const shareTokenBalance = getShareTokenBalance(tokens)

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
          icon={TokenHeadGrayIcon}
        />
        <StatRow
          label="Locked tvDAI"
          value={formatNumber(39218292)}
          icon={TokenHeadGrayIcon}
        />
        <StatRow
          label="Total value (DAI)"
          value={renderFallback(
            totalValue !== undefined ? formatNumber(totalValue) : totalValue,
          )}
          icon={TokenHeadColorIcon}
        />
        <StatRow
          label="Est. Earnings (DAI)"
          value={renderFallback(
            estEarning !== undefined ? formatNumber(estEarning) : estEarning,
          )}
          icon={TokenHeadColorIcon}
        />
      </div>
    </div>
  )
}

export default YourStats

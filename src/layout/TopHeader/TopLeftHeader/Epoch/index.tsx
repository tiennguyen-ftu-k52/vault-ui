import { useQuery } from 'react-query'
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks'
import EpochRow from './EpochRow'
import styles from './index.module.scss'
import { getStats } from '@api/network'
import { Stats } from '@interfaces/network'
import { renderFallback } from '@utils/common'
import { calcDurationTimestamps, calcEpochTimeLeft } from '@utils/network'
import CountDown from '@components/CountDown'
import { formatNumber } from '@utils/number'
import { Space } from 'antd'

function Epoch() {
  const {
    network: { apiAddress },
  } = useGetNetworkConfig()

  const { data: stats, refetch } = useQuery<Stats>({
    queryKey: ['stats', apiAddress],
    queryFn: () => getStats(apiAddress),
    enabled: !!apiAddress,
  })

  function getEpochValues(stats: Stats | undefined) {
    if (!stats) {
      const placeholder = renderFallback()
      return {
        epoch: placeholder,
        timer: '',
        start: placeholder,
        end: placeholder,
        secondsOnReset: 0,
      }
    }

    const timer = calcEpochTimeLeft({
      refreshRate: stats.refreshRate,
      roundsPassed: stats.roundsPassed,
      roundsPerEpoch: stats.roundsPerEpoch,
    })
    const { start, end } = calcDurationTimestamps({
      refreshRate: stats.refreshRate,
      roundsPassed: stats.roundsPassed,
      roundsPerEpoch: stats.roundsPerEpoch,
    })
    const secondsOnReset = (stats.refreshRate / 1000) * stats.roundsPerEpoch

    return { epoch: stats.epoch, timer, start, end, secondsOnReset }
  }

  const { epoch, timer, start, end, secondsOnReset } = getEpochValues(stats)

  return (
    <Space size={24} className={styles.container}>
      <EpochRow
        label="Epoch"
        value={
          timer !== '' ? (
            <CountDown
              seconds={timer as number}
              secondsOnReset={secondsOnReset}
              onCountdownEnd={refetch}
            />
          ) : (
            timer
          )
        }
        importantValue={epoch ? formatNumber(epoch as number) : epoch}
      />
      <EpochRow label="Start" value={start} />
      <EpochRow label="End" value={end} />
    </Space>
  )
}

export default Epoch

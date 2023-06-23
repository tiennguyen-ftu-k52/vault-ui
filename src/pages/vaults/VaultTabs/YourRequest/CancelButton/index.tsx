import { Button, notification } from 'antd'
import { cancelWithdraw } from '@api/vaultContract'
import styles from './index.module.scss'
import { useTrackTransaction } from '@hooks/useTrackTransaction'
import { useContractQuery } from '@hooks/useContractQuery'
import { useWithdrawRequests } from '@hooks/useWithdrawRequests'
import { useLoading } from '@hooks/useLoading'

interface Props {
  address: string
  amount: number
  ts: number
}

function CancelButton({ address, amount, ts }: Props) {
  const { trackTransaction } = useTrackTransaction()
  const { refetchContractQueries } = useContractQuery()
  const { refetchWithdrawRequests } = useWithdrawRequests()
  const { setLoadingState } = useLoading()

  async function handleSubmit() {
    setLoadingState(true)
    const txId = await cancelWithdraw({
      address,
      amount,
      ts,
    })
    if (!txId) {
      notification.error({
        message: 'Cancel withdraw request failed',
      })
      setLoadingState(false)
    } else {
      trackTransaction({
        id: txId,
        onSuccess() {
          notification.success({
            message: 'Cancel withdraw request successfully',
          })
          setLoadingState(false)
          refetchContractQueries()
          refetchWithdrawRequests()
        },
        onError() {
          notification.error({
            message: 'Cancel withdraw request failed',
          })
          setLoadingState(false)
        },
      })
    }
  }

  return (
    <Button onClick={handleSubmit} className={styles.button}>
      Cancel
    </Button>
  )
}

export default CancelButton

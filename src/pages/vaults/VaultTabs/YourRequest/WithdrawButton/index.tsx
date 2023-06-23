import { Button, notification } from 'antd'
import { withdraw } from '@api/vaultContract'
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

function WithdrawButton({ address, amount, ts }: Props) {
  const { trackTransaction } = useTrackTransaction()
  const { refetchContractQueries } = useContractQuery()
  const { refetchWithdrawRequests } = useWithdrawRequests()
  const { setLoadingState } = useLoading()

  async function handleSubmit() {
    setLoadingState(true)
    const txId = await withdraw({
      address,
      amount,
      ts,
    })
    if (!txId) {
      notification.error({
        message: 'Request withdraw failed',
      })
      setLoadingState(false)
    } else {
      trackTransaction({
        id: txId,
        onSuccess() {
          notification.success({
            message: `Withdraw ${amount} DAI successfully`,
          })
          setLoadingState(false)
          refetchContractQueries()
          refetchWithdrawRequests()
        },
        onError() {
          notification.error({
            message: 'Request withdraw failed',
          })
          setLoadingState(false)
        },
      })
    }
  }

  return (
    <Button onClick={handleSubmit} className={styles.button}>
      Withdraw
    </Button>
  )
}

export default WithdrawButton

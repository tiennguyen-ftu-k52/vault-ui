import { Button, notification } from 'antd'
import { requestWithdraw } from '@api/vaultContract'
import styles from './index.module.scss'
import { useTrackTransaction } from '@hooks/useTrackTransaction'
import { useContractQuery } from '@hooks/useContractQuery'
import { UseWithdrawRequests } from '@hooks/useWithdrawRequests'
import { useLoading } from '@hooks/useLoading'

interface Props {
  address: string
  amount: string
  balance: number
  withdrawRequestsData: UseWithdrawRequests
  onSubmit?: () => void
}

function RequestWithdrawButton({
  address,
  amount,
  balance,
  withdrawRequestsData,
  onSubmit,
}: Props) {
  const { trackTransaction } = useTrackTransaction()
  const { refetchContractQueries } = useContractQuery()
  const { refetchWithdrawRequests } = withdrawRequestsData
  const { setLoadingState } = useLoading()

  async function handleSubmit() {
    const numAmount = Number(amount)

    if (numAmount <= 0) {
      notification.error({
        message: 'Invalid amount',
      })
      return
    }

    if (numAmount > balance) {
      notification.error({
        message: 'Error',
        description: 'Insufficient balance',
      })
      return
    }

    setLoadingState(true)
    const txId = await requestWithdraw({
      address,
      amount: numAmount,
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
            message: `Request withdraw ${numAmount} DAI successfully`,
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
      onSubmit && onSubmit()
    }
  }

  return (
    <Button onClick={handleSubmit} className={styles.button}>
      REQUEST QUEUE
    </Button>
  )
}

export default RequestWithdrawButton

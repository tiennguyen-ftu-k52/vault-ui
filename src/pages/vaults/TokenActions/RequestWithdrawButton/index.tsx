import { Button, notification } from 'antd'
import { requestWithdraw } from '../../../../api/vaultContract'
import styles from './index.module.scss'
import { useTrackTransaction } from '../../../../hooks/useTrackTransaction'
import { useContractQuery } from '../../../../hooks/useContractQuery'
import { UseWithdrawRequests } from '../../../../hooks/useWithdrawRequests'

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

  async function handleSubmit() {
    const numAmount = Number(amount)
    if (numAmount > balance) {
      notification.error({
        message: 'Error',
        description: 'Insufficient balance',
      })
    } else {
      const txId = await requestWithdraw({
        address,
        amount: numAmount,
      })
      if (!txId) {
        notification.error({
          message: 'Error',
          description: 'Request withdraw failed',
        })
      } else {
        trackTransaction({
          id: txId,
          message: `Request withdraw ${numAmount} DAI successfully`,
          successAction() {
            refetchContractQueries()
            refetchWithdrawRequests()
          },
        })
        onSubmit && onSubmit()
      }
    }
  }

  return (
    <Button onClick={handleSubmit} className={styles.button}>
      REQUEST QUEUE
    </Button>
  )
}

export default RequestWithdrawButton

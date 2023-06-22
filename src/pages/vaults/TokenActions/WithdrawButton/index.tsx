import { Button, notification } from 'antd'
import { requestWithdraw } from '../../../../api/vaultContract'
import styles from './index.module.scss'
import { useTrackTransaction } from '../../../../hooks/useTrackTransaction'

interface Props {
  address: string
  amount: string
  balance: number
  onSubmit?: () => void
}

function WithdrawButton({ address, amount, balance, onSubmit }: Props) {
  const { trackTransaction } = useTrackTransaction()

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

export default WithdrawButton

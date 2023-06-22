import { Button, notification } from 'antd'
import { requestWithdraw } from '../../../../api/vaultContract'
import styles from './index.module.scss'

interface Props {
  address: string
  amount: string
  balance: number
}

function WithdrawButton({ address, amount, balance }: Props) {
  async function handleSubmit() {
    const numAmount = Number(amount)
    if (numAmount > balance) {
      notification.error({
        message: 'Error',
        description: 'Insufficient balance',
      })
    } else {
      const success = await requestWithdraw({
        address,
        amount: numAmount,
      })
      if (!success) {
        notification.error({
          message: 'Error',
          description: 'Request withdraw failed',
        })
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

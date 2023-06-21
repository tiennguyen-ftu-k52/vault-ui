import { Button, notification } from 'antd'
import { deposit } from '../../../../api/vaultContract'
import styles from './index.module.scss'

interface Props {
  address: string
  amount: string
  assetBalance: number
}

function DepositButton({ address, amount, assetBalance }: Props) {
  async function handleSubmit() {
    const numAmount = Number(amount)
    if (numAmount > assetBalance) {
      notification.error({
        message: 'Error',
        description: 'Insufficient balance',
      })
    } else {
      const success = await deposit({
        address,
        amount: numAmount,
      })
      if (!success) {
        notification.error({
          message: 'Error',
          description: 'Deposit failed',
        })
      }
    }
  }

  return (
    <Button onClick={handleSubmit} className={styles.button}>
      DEPOSIT DAI
    </Button>
  )
}

export default DepositButton

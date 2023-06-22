import { Button, notification } from 'antd'
import { deposit } from '../../../../api/vaultContract'
import styles from './index.module.scss'
import { useTrackTransaction } from '../../../../hooks/useTrackTransaction'

interface Props {
  address: string
  amount: string
  balance: number
  onSubmit?: () => void
}

function DepositButton({ address, amount, balance, onSubmit }: Props) {
  const { trackTransaction } = useTrackTransaction()

  async function handleSubmit() {
    const numAmount = Number(amount)
    if (numAmount > balance) {
      notification.error({
        message: 'Insufficient balance',
      })
    } else {
      const txId = await deposit({
        address,
        amount: numAmount,
      })
      if (!txId) {
        notification.error({
          message: 'Deposit failed',
        })
      } else {
        trackTransaction({
          id: txId,
          message: `Deposit ${numAmount} DAI successfully`,
        })
        onSubmit && onSubmit()
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

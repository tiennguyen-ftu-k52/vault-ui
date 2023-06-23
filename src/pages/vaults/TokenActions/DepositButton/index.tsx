import { Button, notification } from 'antd'
import { deposit } from '@api/vaultContract'
import styles from './index.module.scss'
import { useTrackTransaction } from '@hooks/useTrackTransaction'
import { useContractQuery } from '@hooks/useContractQuery'
import { useLoading } from '@hooks/useLoading'

interface Props {
  address: string
  amount: string
  balance: number
  onSubmit?: () => void
}

function DepositButton({ address, amount, balance, onSubmit }: Props) {
  const { trackTransaction } = useTrackTransaction()
  const { refetchContractQueries } = useContractQuery()
  const { setLoadingState } = useLoading()

  async function handleSubmit() {
    const numAmount = Number(amount)

    if (numAmount > balance) {
      notification.error({
        message: 'Insufficient balance',
      })
      return
    }

    setLoadingState(true)
    const txId = await deposit({
      address,
      amount: numAmount,
    })
    if (!txId) {
      notification.error({
        message: 'Deposit failed',
      })
      setLoadingState(false)
    } else {
      trackTransaction({
        id: txId,
        onSuccess() {
          notification.success({
            message: `Deposit ${numAmount} DAI successfully`,
          })
          setLoadingState(false)
          refetchContractQueries()
        },
        onError() {
          notification.error({
            message: 'Deposit failed',
          })
          setLoadingState(false)
        },
      })
      onSubmit && onSubmit()
    }
  }

  return (
    <Button onClick={handleSubmit} className={styles.button}>
      DEPOSIT DAI
    </Button>
  )
}

export default DepositButton

import { Button, notification } from 'antd'
import { withdraw } from '../../../../../api/vaultContract'
import styles from './index.module.scss'
import { useTrackTransaction } from '../../../../../hooks/useTrackTransaction'
import { useContractQuery } from '../../../../../hooks/useContractQuery'
import { useWithdrawRequests } from '../../../../../hooks/useWithdrawRequests'

interface Props {
  address: string
  amount: number
  ts: number
}

function WithdrawButton({ address, amount, ts }: Props) {
  const { trackTransaction } = useTrackTransaction()
  const { refetchContractQueries } = useContractQuery()
  const { refetchWithdrawRequests } = useWithdrawRequests()

  async function handleSubmit() {
    const txId = await withdraw({
      address,
      amount,
      ts,
    })
    if (!txId) {
      notification.error({
        message: 'Error',
        description: 'Request withdraw failed',
      })
    } else {
      trackTransaction({
        id: txId,
        message: `Withdraw ${amount} DAI successfully`,
        successAction() {
          refetchContractQueries()
          refetchWithdrawRequests()
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

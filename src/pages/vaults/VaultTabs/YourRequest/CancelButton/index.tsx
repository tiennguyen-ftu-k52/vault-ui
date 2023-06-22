import { Button, notification } from 'antd'
import { cancelWithdraw } from '../../../../../api/vaultContract'
import styles from './index.module.scss'
import { useTrackTransaction } from '../../../../../hooks/useTrackTransaction'
import { useContractQuery } from '../../../../../hooks/useContractQuery'
import { useWithdrawRequests } from '../../../../../hooks/useWithdrawRequests'

interface Props {
  address: string
  amount: number
  ts: number
}

function CancelButton({ address, amount, ts }: Props) {
  const { trackTransaction } = useTrackTransaction()
  const { refetchContractQueries } = useContractQuery()
  const { refetchWithdrawRequests } = useWithdrawRequests()

  async function handleSubmit() {
    const txId = await cancelWithdraw({
      address,
      amount,
      ts,
    })
    if (!txId) {
      notification.error({
        message: 'Error',
        description: 'Cancel withdraw request failed',
      })
    } else {
      trackTransaction({
        id: txId,
        message: 'Cancel withdraw request successfully',
        successAction() {
          refetchContractQueries()
          refetchWithdrawRequests()
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

import InputToken from '../InputToken'
import LockToken from '../LockToken'
import PreviewResult from '../PreviewResult'
import Tip from '../Tip'
import DepositButton from '../DepositButton'
import styles from './index.module.scss'

interface Props {
  address: string
  assetBalance: number
  amount: string
  setAmount: (value: string) => void
  checked: boolean
  setChecked: (value: boolean) => void
}

function DepositBox({
  address,
  assetBalance,
  amount,
  setAmount,
  checked,
  setChecked,
}: Props) {
  return (
    <div>
      <InputToken
        amount={amount}
        assetBalance={assetBalance}
        setAmount={setAmount}
      />

      <div className={styles.checkboxContainer}>
        <LockToken checked={checked} setChecked={setChecked} />
      </div>

      <div className={styles.previewContainer}>
        <PreviewResult amount={amount} />
      </div>

      <div className={styles.buttonContainer}>
        <DepositButton
          address={address}
          amount={amount}
          assetBalance={assetBalance}
        />
      </div>

      <Tip
        title="Please Aware"
        content={
          "You can't immediately withdraw your assets. Withdraws follow an epoch..."
        }
      />
    </div>
  )
}

export default DepositBox

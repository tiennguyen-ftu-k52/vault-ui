import InputToken from '../InputToken'
import LockToken from '../LockToken'
import PreviewResult from '../PreviewResult'
import Tip from '../Tip'
import DepositButton from '../DepositButton'
import { Space } from 'antd'

interface Props {
  address: string
  balance: number
  amount: string
  setAmount: (value: string) => void
  checked: boolean
  setChecked: (value: boolean) => void
}

function DepositBox({
  address,
  balance,
  amount,
  setAmount,
  checked,
  setChecked,
}: Props) {
  return (
    <Space size={24} direction="vertical">
      <InputToken
        amount={amount}
        title="Deposit"
        balance={balance}
        setAmount={setAmount}
      />

      <LockToken checked={checked} setChecked={setChecked} />

      <PreviewResult amount={amount} title="You receive" />

      <DepositButton address={address} amount={amount} balance={balance} />

      <Tip
        title="Please Aware"
        content={
          "You can't immediately withdraw your assets. Withdraws follow an epoch..."
        }
      />
    </Space>
  )
}

export default DepositBox

import { useState } from 'react'
import { Space } from 'antd'
import InputToken from '../InputToken'
import LockToken from '../LockToken'
import PreviewResult from '../PreviewResult'
import Tip from '../Tip'
import DepositButton from '../DepositButton'
import { useContractQuery } from '@hooks/useContractQuery'
import TokenColorIcon from '@assets/icons/token-head-color.png'
import TokenGrayIcon from '@assets/icons/token-head-gray.png'

interface Props {
  address: string
}

function DepositBox({ address }: Props) {
  const { assetsTokenBalance: balance } = useContractQuery()
  const [amount, setAmount] = useState('')
  const [checked, setChecked] = useState(false)

  function clearState() {
    setAmount('')
    setChecked(false)
  }

  return (
    <Space size={24} direction="vertical">
      <InputToken
        amount={amount}
        title="Deposit"
        balance={balance}
        setAmount={setAmount}
        tokenOptions={[
          {
            label: 'DAI',
            value: 'dai',
            icon: TokenColorIcon,
          },
        ]}
      />

      <LockToken checked={checked} setChecked={setChecked} />

      <PreviewResult
        amount={amount}
        title="You receive"
        tokenOption={{
          label: 'tvDAI',
          value: 'tvdai',
          icon: TokenGrayIcon,
        }}
      />

      <DepositButton
        address={address}
        amount={amount}
        balance={balance}
        onSubmit={clearState}
      />

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

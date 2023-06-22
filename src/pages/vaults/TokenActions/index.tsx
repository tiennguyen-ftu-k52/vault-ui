import { useState } from 'react'
import { Row } from 'antd'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks'
import ActionDetails from './ActionDetails'
import ActionTabs from './ActionTabs'
import DepositBox from './DepositBox'
import styles from './index.module.scss'
import WithdrawBox from './WithdrawBox'
import { useContractQuery } from '../../../hooks/useContractQuery'

const TAB_ITEMS = [
  {
    label: 'DEPOSIT',
    value: 'deposit',
  },
  {
    label: 'WITHDRAW',
    value: 'withdraw',
  },
  {
    label: 'UNLOCK',
    value: 'unlock',
  },
]

function TokenActions() {
  const [activeTab, setActiveTab] = useState('deposit')
  const [amount, setAmount] = useState('')
  const [checked, setChecked] = useState(false)

  const { address } = useGetAccountInfo()
  const { assetsTokenBalance, shareTokenBalance } = useContractQuery()

  return (
    <>
      <Row align="middle" justify="center" className={styles.container}>
        <ActionTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          items={TAB_ITEMS}
        />

        <div className={styles.boxContainer}>
          {activeTab === 'deposit' && (
            <DepositBox
              address={address}
              balance={assetsTokenBalance}
              amount={amount}
              setAmount={setAmount}
              checked={checked}
              setChecked={setChecked}
            />
          )}
          {activeTab === 'withdraw' && (
            <WithdrawBox
              address={address}
              balance={shareTokenBalance}
              amount={amount}
              setAmount={setAmount}
            />
          )}
        </div>
      </Row>

      <div className={styles.detailContainer}>
        {activeTab === 'deposit' && <ActionDetails title="Deposit" />}
        {activeTab === 'withdraw' && <ActionDetails title="Withdraw" />}
      </div>
    </>
  )
}

export default TokenActions

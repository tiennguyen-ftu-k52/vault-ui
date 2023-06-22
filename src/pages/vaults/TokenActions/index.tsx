import { useState } from 'react'
import { Row } from 'antd'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks'
import ActionDetails from './ActionDetails'
import ActionTabs from './ActionTabs'
import DepositBox from './DepositBox'
import styles from './index.module.scss'
import RequestWithdrawBox from './RequestWithdrawBox'
import { UseWithdrawRequests } from '../../../hooks/useWithdrawRequests'

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

interface Props {
  withdrawRequestsData: UseWithdrawRequests
}

function TokenActions({ withdrawRequestsData }: Props) {
  const [activeTab, setActiveTab] = useState('deposit')

  const { address } = useGetAccountInfo()

  return (
    <>
      <Row align="middle" justify="center" className={styles.container}>
        <ActionTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          items={TAB_ITEMS}
        />

        <div className={styles.boxContainer}>
          {activeTab === 'deposit' && <DepositBox address={address} />}
          {activeTab === 'withdraw' && (
            <RequestWithdrawBox
              address={address}
              withdrawRequestsData={withdrawRequestsData}
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

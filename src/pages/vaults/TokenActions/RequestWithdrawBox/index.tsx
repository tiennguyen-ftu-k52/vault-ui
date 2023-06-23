import { useState } from 'react'
import { Row, Space } from 'antd'
import InputToken from '../InputToken'
import PreviewResult from '../PreviewResult'
import Tip from '../Tip'
import RequestWithdrawButton from '../RequestWithdrawButton'
import styles from './index.module.scss'
import { useContractQuery } from '@hooks/useContractQuery'
import { UseWithdrawRequests } from '@hooks/useWithdrawRequests'
import TokenBlackIcon from '@assets/icons/token-head-black.png'
import TokenColorIcon from '@assets/icons/token-head-color.png'

interface Props {
  address: string
  withdrawRequestsData: UseWithdrawRequests
}

function RequestWithdrawBox({ address, withdrawRequestsData }: Props) {
  const { shareTokenBalance: balance } = useContractQuery()
  const [amount, setAmount] = useState('')

  function clearState() {
    setAmount('')
  }

  return (
    <Space size={24} direction="vertical">
      <InputToken
        title="Redeem"
        amount={amount}
        balance={balance}
        setAmount={setAmount}
        tokenOptions={[
          {
            label: 'tvDAI',
            value: 'tvdai',
            icon: TokenBlackIcon,
          },
        ]}
      />

      <PreviewResult
        amount={amount}
        title="Get"
        tokenOption={{
          label: 'DAI',
          value: 'dai',
          icon: TokenColorIcon,
        }}
      />

      <RequestWithdrawButton
        address={address}
        amount={amount}
        balance={balance}
        onSubmit={clearState}
        withdrawRequestsData={withdrawRequestsData}
      />

      <Tip
        title="Withdraw requests"
        content={
          'You must make a withdraw request before you can withdraw your assets.'
        }
        footer={
          <Row align="middle" justify="space-between">
            <div className={styles.tipFooterTitle}>
              <div>CURRENT</div>
              <div>WITHDRAW EPOCH</div>
            </div>
            <div className={styles.tipFooterContent}>12h 56m 02s</div>
          </Row>
        }
      />
    </Space>
  )
}

export default RequestWithdrawBox

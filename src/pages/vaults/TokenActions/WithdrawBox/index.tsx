import { useState } from 'react'
import { Row, Space } from 'antd'
import InputToken from '../InputToken'
import PreviewResult from '../PreviewResult'
import Tip from '../Tip'
import WithdrawButton from '../WithdrawButton'
import styles from './index.module.scss'
import { useContractQuery } from '../../../../hooks/useContractQuery'

interface Props {
  address: string
}

function WithdrawBox({ address }: Props) {
  const { shareTokenBalance: balance } = useContractQuery()
  const [amount, setAmount] = useState('')

  function clearState() {
    setAmount('')
  }

  return (
    <Space size={24} direction="vertical">
      <InputToken
        title="Withdraw"
        amount={amount}
        balance={balance}
        setAmount={setAmount}
      />

      <PreviewResult amount={amount} title="Get" />

      <WithdrawButton
        address={address}
        amount={amount}
        balance={balance}
        onSubmit={clearState}
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

export default WithdrawBox

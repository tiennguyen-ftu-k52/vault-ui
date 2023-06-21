import { useState } from 'react'
import { useQuery } from 'react-query'
import { Row } from 'antd'
import {
  useGetAccountInfo,
  useGetNetworkConfig,
} from '@multiversx/sdk-dapp/hooks'
import { WalletToken } from '../../../interfaces/wallet'
import { getWalletTokens } from '../../../api/wallet'
import { getAssetTokenBalance } from '../../../utils/wallet'
import ActionDetails from './ActionDetails'
import ActionTabs from './ActionTabs'
import DepositBox from './DepositBox'
import styles from './index.module.scss'

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

  const {
    network: { apiAddress },
  } = useGetNetworkConfig()
  const { address } = useGetAccountInfo()
  const { data: tokens } = useQuery<WalletToken[]>({
    queryKey: ['tokens', apiAddress],
    queryFn: () => getWalletTokens(apiAddress, address),
    enabled: !!apiAddress,
  })

  const assetBalance = getAssetTokenBalance(tokens)

  return (
    <>
      <Row align="middle" justify="center" className={styles.container}>
        <ActionTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          items={TAB_ITEMS}
        />

        <div className={styles.boxContainer}>
          <DepositBox
            address={address}
            assetBalance={assetBalance}
            amount={amount}
            setAmount={setAmount}
            checked={checked}
            setChecked={setChecked}
          />
        </div>
      </Row>

      <div className={styles.detailContainer}>
        <ActionDetails title="Deposit" />
      </div>
    </>
  )
}

export default TokenActions

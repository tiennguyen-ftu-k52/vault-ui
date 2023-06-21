import { useState } from 'react'
import { useQuery } from 'react-query'
import { Row } from 'antd'
import InputToken from './InputToken'
import LockToken from './LockToken'
import PreviewResult from './PreviewResult'
import styles from './index.module.scss'
import {
  useGetAccountInfo,
  useGetNetworkConfig,
} from '@multiversx/sdk-dapp/hooks'
import { WalletToken } from '../../../interfaces/wallet'
import { getWalletTokens } from '../../../api/wallet'
import { getAssetTokenBalance } from '../../../utils/wallet'
import ActionDetails from './ActionDetails'
import Tip from './Tip'
import DepositButton from './DepositButton'
import ActionTabs from './ActionTabs'

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
      </Row>

      <div className={styles.detailContainer}>
        <ActionDetails title="Deposit" />
      </div>
    </>
  )
}

export default TokenActions

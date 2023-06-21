import { useState } from 'react'
import { useQuery } from 'react-query'
import { Button, Divider, Row, Space, notification } from 'antd'
import cs from 'classnames'
import { ReactComponent as AutoRefreshIcon } from '../../../assets/icons/auto-refresh.svg'
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/arrow-down.svg'
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
import { deposit } from '../../../api/vaultContract'

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

  async function handleSubmit() {
    const numAmount = Number(amount)
    if (numAmount > assetBalance) {
      notification.error({
        message: 'Error',
        description: 'Insufficient balance',
      })
    } else {
      const success = await deposit({
        address,
        amount: numAmount,
      })
      if (!success) {
        notification.error({
          message: 'Error',
          description: 'Deposit failed',
        })
      }
    }
  }

  return (
    <>
      <div className={styles.actionContainer}>
        <div className={styles.tabContainer}>
          <div className={styles.leftTabs}>
            <Space size={24}>
              {TAB_ITEMS.map((item) => (
                <a
                  key={item.value}
                  className={cs(
                    styles.tab,
                    activeTab === item.value && styles.tabActive,
                  )}
                  onClick={() => setActiveTab(item.value)}
                >
                  {item.label}
                </a>
              ))}
            </Space>
          </div>
          <a className={styles.refreshButton}>
            <AutoRefreshIcon className={styles.refreshIcon} />
          </a>
        </div>

        <div className={styles.boxContainer}>
          <InputToken
            amount={amount}
            assetBalance={assetBalance}
            setAmount={setAmount}
          />

          <LockToken checked={checked} setChecked={setChecked} />

          <PreviewResult amount={amount} />

          <div className={styles.buttonContainer}>
            <Button onClick={handleSubmit} className={styles.button}>
              DEPOSIT DAI
            </Button>
          </div>

          <div className={styles.tipContainer}>
            <Row
              className={styles.tipHeading}
              justify="space-between"
              align="middle"
            >
              <span className={styles.tipTitle}>Please Aware</span>
              <ArrowDownIcon className={styles.tipIcon} />
            </Row>

            <div className={styles.tipContent}>
              You can't immediately withdraw your assets. Withdraws follow an
              epoch ...
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailContainer}>
        <div className={styles.detailHeading}>Deposit details</div>
        <Divider style={{ margin: '16px 0' }} />
        <Row
          className={styles.detailRow}
          justify="space-between"
          align="middle"
        >
          <span className={styles.detailLabel}>DAI deposit</span>
          <span className={styles.detailValue}>27342.12 DAI</span>
        </Row>
        <Row
          className={styles.detailRow}
          justify="space-between"
          align="middle"
        >
          <span className={styles.detailLabel}>tvDAI reveice</span>
          <span className={cs(styles.detailValue, styles.detailValueActive)}>
            27342.12 tvDAI
          </span>
        </Row>
        <Row
          className={styles.detailRow}
          justify="space-between"
          align="middle"
        >
          <span className={styles.detailLabel}>Fees</span>
          <span className={styles.detailValue}>20 DAI</span>
        </Row>
      </div>
    </>
  )
}

export default TokenActions

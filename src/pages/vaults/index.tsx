import { useWithdrawRequests } from '../../hooks/useWithdrawRequests'
import Layout from '../../layout'
import OrderBox from './TokenActions'
import VaultOverview from './VaultTabs'
import YourStats from './YourStats'
import styles from './index.module.scss'

function VaultPage() {
  const withdrawRequestsData = useWithdrawRequests()

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.leftInnerContainer}>
            <div className={styles.overviewContainer}>
              <VaultOverview withdrawRequestsData={withdrawRequestsData} />
              <YourStats />
            </div>
          </div>
        </div>

        <div className={styles.rightContainer}>
          <OrderBox withdrawRequestsData={withdrawRequestsData} />
        </div>
      </div>
    </Layout>
  )
}

export default VaultPage

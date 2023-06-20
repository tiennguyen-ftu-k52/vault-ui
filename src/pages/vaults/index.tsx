import Layout from '../../layout'
import OrderBox from './OrderBox'
import VaultOverview from './VaultOverview'
import VaultStats from './VaultStats'
import styles from './index.module.scss'

function VaultPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.leftInnerContainer}>
            <div className={styles.overviewContainer}>
              <VaultOverview />
              <VaultStats />
            </div>
          </div>
        </div>

        <div className={styles.rightContainer}>
          <OrderBox />
        </div>
      </div>
    </Layout>
  )
}

export default VaultPage

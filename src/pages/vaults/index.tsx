import Layout from '../../layout'
import VaultOverview from './VaultOverview'
import VaultStats from './VaultStats'
import styles from './index.module.scss'

function VaultPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.overviewContainer}>
          <VaultOverview />
        </div>
        <div>
          <VaultStats />
        </div>
      </div>
    </Layout>
  )
}

export default VaultPage

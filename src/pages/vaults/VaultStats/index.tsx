import { ReactComponent as TokenHeadGray } from '../../../assets/icons/token-head-gray.svg'
import { ReactComponent as TokenHeadColor } from '../../../assets/icons/token-head-color.svg'
import styles from './index.module.scss'

function VaultStats() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Your stats</div>

      <div className={styles.statContainer}>
        <div className={styles.row}>
          <div className={styles.label}>Total deposit & reward</div>
          <div className={styles.value}>
            <TokenHeadGray className={styles.valueIcon} />
            <span className={styles.valueText}>943,392,182.92</span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Locked tvDAI</div>
          <div className={styles.value}>
            <TokenHeadGray className={styles.valueIcon} />
            <span className={styles.valueText}>392,182.92</span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Total value (DAI)</div>
          <div className={styles.value}>
            <TokenHeadColor className={styles.valueIcon} />
            <span className={styles.valueText}>392,182.92</span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Est. Earnings (DAI)</div>
          <div className={styles.value}>
            <TokenHeadColor className={styles.valueIcon} />
            <span className={styles.valueText}>182.92</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VaultStats

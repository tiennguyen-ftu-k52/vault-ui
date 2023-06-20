import TokenHeadGrayIcon from '../../../assets/icons/token-head-gray.png'
import TokenHeadColorIcon from '../../../assets/icons/token-head-color.png'
import styles from './index.module.scss'

function VaultStats() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Your stats</div>

      <div className={styles.statContainer}>
        <div className={styles.row}>
          <div className={styles.label}>Total deposit & reward</div>
          <div className={styles.value}>
            <img src={TokenHeadGrayIcon} className={styles.valueIcon} />
            <span className={styles.valueText}>943,392,182.92</span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Locked tvDAI</div>
          <div className={styles.value}>
            <img src={TokenHeadGrayIcon} className={styles.valueIcon} />
            <span className={styles.valueText}>392,182.92</span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Total value (DAI)</div>
          <div className={styles.value}>
            <img src={TokenHeadColorIcon} className={styles.valueIcon} />
            <span className={styles.valueText}>392,182.92</span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Est. Earnings (DAI)</div>
          <div className={styles.value}>
            <img src={TokenHeadColorIcon} className={styles.valueIcon} />
            <span className={styles.valueText}>182.92</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VaultStats

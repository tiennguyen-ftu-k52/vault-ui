import { ReactComponent as IconClear } from '../../../../../assets/icons/icon-clear.svg'
import styles from './index.module.scss'

function TagListDuration() {
  return (
    <div className={styles.container}>
      <a className={styles.tag} style={{ width: '22%' }}>
        <IconClear className={styles.icon} />
        <span>Clear</span>
      </a>
      <a className={styles.tag} style={{ width: '30%' }}>
        <span>Min: 15d</span>
      </a>
      <a className={styles.tag} style={{ width: '16%' }}>
        <span>1m</span>
      </a>
      <a className={styles.tag} style={{ width: '16%' }}>
        <span>6m</span>
      </a>
      <a className={styles.tag} style={{ width: '16%' }}>
        <span>1y</span>
      </a>
    </div>
  )
}

export default TagListDuration

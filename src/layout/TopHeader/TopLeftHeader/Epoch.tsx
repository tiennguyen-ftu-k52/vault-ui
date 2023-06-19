import styles from './Epoch.module.scss'
import EpochRow from './EpochRow'

function Epoch() {
  return (
    <div className={styles.container}>
      <EpochRow label="Epoch" value="- 2d 12h 47m" />
      <EpochRow label="Start" value="12/06/23, 4:10" />
      <EpochRow label="End" value="15/06/23, 4:10" />
    </div>
  )
}

export default Epoch
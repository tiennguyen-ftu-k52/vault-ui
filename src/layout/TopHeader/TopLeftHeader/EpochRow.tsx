import styles from './EpochRow.module.scss'

interface Props {
  label: string
  value: string
}

function EpochRow({ label, value }: Props) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}

export default EpochRow

import styles from './EpochRow.module.scss'

interface Props {
  label: string
  value: string
  importantValue?: string
}

function EpochRow({ label, value, importantValue }: Props) {
  return (
    <div className={styles.row}>
      <div className={styles.inner}>
        <span className={styles.label}>{label}</span>
        {importantValue && (
          <span className={styles.importantValue}>{importantValue}</span>
        )}
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  )
}

export default EpochRow

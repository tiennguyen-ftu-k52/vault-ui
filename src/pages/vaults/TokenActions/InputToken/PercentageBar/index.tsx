import cs from 'classnames'
import styles from './index.module.scss'

interface Props {
  percentage: number
  setPercentage: (percentage: number) => void
}

function PercentageBar({ percentage, setPercentage }: Props) {
  return (
    <div className={styles.container}>
      <a
        className={cs(
          styles.section,
          [25, 50, 75, 100].includes(percentage) && styles.sectionActive,
        )}
        onClick={() => setPercentage(25)}
      />
      <a
        className={cs(
          styles.section,
          [50, 75, 100].includes(percentage) && styles.sectionActive,
        )}
        onClick={() => setPercentage(50)}
      />
      <a
        className={cs(
          styles.section,
          [75, 100].includes(percentage) && styles.sectionActive,
        )}
        onClick={() => setPercentage(75)}
      />
      <a
        className={cs(
          styles.section,
          percentage === 100 && styles.sectionActive,
        )}
        onClick={() => setPercentage(100)}
      />
    </div>
  )
}

export default PercentageBar

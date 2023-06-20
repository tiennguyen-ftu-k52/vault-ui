import cs from 'classnames'
import styles from './index.module.scss'
import { useState } from 'react'

function PercentageBar() {
  const [percentage, setPercentage] = useState(0)

  return (
    <div className={styles.container}>
      <a
        className={cs(styles.section, percentage >= 25 && styles.sectionActive)}
        onClick={() => setPercentage(25)}
      >
        {' '}
      </a>
      <a
        className={cs(styles.section, percentage >= 50 && styles.sectionActive)}
        onClick={() => setPercentage(50)}
      />
      <a
        className={cs(styles.section, percentage >= 75 && styles.sectionActive)}
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

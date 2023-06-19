import Epoch from './Epoch'
import Heading from './Heading'
import styles from './index.module.scss'

function TopLeftHeader() {
  return (
    <div className={styles.container}>
      <Heading />
      <Epoch />
    </div>
  )
}

export default TopLeftHeader

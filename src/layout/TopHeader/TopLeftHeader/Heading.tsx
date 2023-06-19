import boldVaultIcon from '../../../assets/icons/vault-bold.svg'
import styles from './Heading.module.scss'

function Heading() {
  return (
    <div className={styles.container}>
      <img src={boldVaultIcon} className={styles.icon} />
      <span className={styles.title}>Tinder Vault</span>
    </div>
  )
}

export default Heading

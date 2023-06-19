import logoImg from '../../assets/images/logo.svg'
import styles from './Logo.module.scss'

function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img src={logoImg} alt="Logo" className={styles.logo} />
    </div>
  )
}

export default Logo

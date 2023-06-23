import { ReactComponent as LogoIcon } from '@assets/images/logo.svg'
import styles from './index.module.scss'

function Logo() {
  return (
    <a className={styles.logoContainer}>
      <LogoIcon width={35} height={35} />
    </a>
  )
}

export default Logo

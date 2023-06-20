import { Row } from 'antd'
import boldVaultIcon from '../../../../assets/icons/vault-bold.svg'
import styles from './index.module.scss'

function Heading() {
  return (
    <Row justify="center" align="middle">
      <img src={boldVaultIcon} className={styles.icon} />
      <span className={styles.title}>Tinder Vault</span>
    </Row>
  )
}

export default Heading

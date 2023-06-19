import { Clock, Setting2 } from 'iconsax-react'
import ButtonIcon from '../../../components/ButtonIcon'
import PrimaryButton from '../../../components/PrimaryButton'
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/arrow-down.svg'
import styles from './index.module.scss'

function TopRightHeader() {
  return (
    <div className={styles.container}>
      <div>
        <ButtonIcon icon={<Clock size="20" />} />
      </div>
      <div className={styles.item}>
        <ButtonIcon icon={<Setting2 size="20" />} />
      </div>
      <div className={styles.item}>
        <PrimaryButton>
          <span className={styles.button}>
            <span className={styles.buttonText}>Connect Wallet</span>
            <ArrowDownIcon />
          </span>
        </PrimaryButton>
      </div>
    </div>
  )
}

export default TopRightHeader

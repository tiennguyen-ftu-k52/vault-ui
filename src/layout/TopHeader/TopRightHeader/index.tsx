import { useExtensionLogin } from '@multiversx/sdk-dapp/hooks'
import {
  useGetIsLoggedIn,
  useGetAccountInfo,
  useGetAccount,
} from '@multiversx/sdk-dapp/hooks/account'
import { Clock, Setting2 } from 'iconsax-react'
import ButtonIcon from '../../../components/ButtonIcon'
import PrimaryButton from '../../../components/PrimaryButton'
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/arrow-down-white.svg'
import styles from './index.module.scss'

function TopRightHeader() {
  const isLoggedIn = useGetIsLoggedIn()
  const account = useGetAccount()
  const userInfo = useGetAccountInfo()
  console.log('isLoggedIn', isLoggedIn)
  console.log('userInfo', userInfo)
  console.log('account', account)
  const [extensionLogin] = useExtensionLogin({
    callbackRoute: '',
  })

  const handleLogin = async () => {
    await extensionLogin()
  }

  return (
    <div className={styles.container}>
      <div>
        <ButtonIcon icon={<Clock size="20" />} />
      </div>
      <div className={styles.item}>
        <ButtonIcon icon={<Setting2 size="20" />} />
      </div>
      <div className={styles.item}>
        <PrimaryButton onClick={handleLogin}>
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

import { useExtensionLogin } from '@multiversx/sdk-dapp/hooks'
import {
  useGetIsLoggedIn,
  useGetAccountInfo,
} from '@multiversx/sdk-dapp/hooks/account'
import { logout } from '@multiversx/sdk-dapp/utils'
import { Dropdown, MenuProps } from 'antd'
import { formatWalletAddress } from '@utils/wallet'
import ButtonPrimary from '@components/ButtonPrimary'
import { ReactComponent as ArrowDownIcon } from '@assets/icons/arrow-down-white.svg'
import styles from './index.module.scss'

const items: MenuProps['items'] = [
  {
    key: 'logout',
    label: (
      <a
        className={styles.dropdownItem}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => logout(window.location.href)}
      >
        Disconnect Wallet
      </a>
    ),
  },
]

function ConnectWallet() {
  const isLoggedIn = useGetIsLoggedIn()
  const accountInfo = useGetAccountInfo()

  const [extensionLogin] = useExtensionLogin({
    callbackRoute: '',
  })

  function handleClick() {
    if (!isLoggedIn) extensionLogin()
  }

  const buttonContent = (
    <ButtonPrimary onClick={handleClick}>
      <span className={styles.button}>
        <span className={styles.buttonText}>
          {isLoggedIn
            ? formatWalletAddress(accountInfo.address)
            : 'Connect Wallet'}
        </span>
        <ArrowDownIcon />
      </span>
    </ButtonPrimary>
  )

  if (isLoggedIn) {
    return (
      <Dropdown menu={{ items }} trigger={['click', 'hover']}>
        {buttonContent}
      </Dropdown>
    )
  }

  return buttonContent
}

export default ConnectWallet

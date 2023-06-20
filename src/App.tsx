import { DappProvider } from '@multiversx/sdk-dapp/wrappers'
import { ConfigProvider } from 'antd'
import VaultPage from './pages/vaults'
import { COLORS } from './constants/colors'

function App() {
  return (
    <DappProvider environment="devnet">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Samsung Sharp Sans, sans-serif',
            colorTextBase: COLORS.BLACK_DEFAULT,
            colorLink: COLORS.IRIS_100,
          },
        }}
      >
        <VaultPage />
      </ConfigProvider>
    </DappProvider>
  )
}

export default App

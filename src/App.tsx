import { DappProvider } from '@multiversx/sdk-dapp/wrappers'
import { ConfigProvider } from 'antd'
import VaultPage from './pages/vaults'
import { COLORS } from './constants/colors'
import { NETWORK_ENVIRONMENT } from './constants/networkEnvironment'

function App() {
  return (
    <DappProvider environment={NETWORK_ENVIRONMENT}>
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

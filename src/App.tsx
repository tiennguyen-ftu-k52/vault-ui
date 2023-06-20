import { QueryClient, QueryClientProvider } from 'react-query'
import { DappProvider } from '@multiversx/sdk-dapp/wrappers'
import { ConfigProvider } from 'antd'
import VaultPage from './pages/vaults'
import { COLORS } from './constants/colors'
import { NETWORK_ENVIRONMENT } from './constants/networkEnvironment'

const queryClient = new QueryClient()

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Samsung Sharp Sans, sans-serif',
          colorTextBase: COLORS.BLACK_DEFAULT,
          colorLink: COLORS.IRIS_100,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <DappProvider environment={NETWORK_ENVIRONMENT}>
          <VaultPage />
        </DappProvider>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App

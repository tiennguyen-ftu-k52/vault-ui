import { QueryClient, QueryClientProvider } from 'react-query'
import { SignTransactionsModals } from '@multiversx/sdk-dapp/UI'
import { DappProvider } from '@multiversx/sdk-dapp/wrappers'
import { ConfigProvider } from 'antd'
import VaultPage from './pages/vaults'
import { COLORS } from './constants/colors'
import { NETWORK_ENV } from './constants/network'
import './api/vaultContract'
import { LoadingProvider } from './contexts/loading'
import GlobalLoading from './components/GlobalLoading'

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
        <DappProvider environment={NETWORK_ENV}>
          <LoadingProvider>
            <GlobalLoading />
            <SignTransactionsModals />
            <VaultPage />
          </LoadingProvider>
        </DappProvider>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App

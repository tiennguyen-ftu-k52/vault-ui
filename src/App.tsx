import { ConfigProvider } from 'antd'
import VaultPage from './pages/vaults/VaultPage'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Samsung Sharp Sans, sans-serif',
        },
      }}
    >
      <VaultPage />
    </ConfigProvider>
  )
}

export default App

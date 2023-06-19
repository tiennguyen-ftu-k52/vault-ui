import { ConfigProvider } from 'antd'
import VaultPage from './pages/vaults/VaultPage'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Samsung Sharp Sans, sans-serif',
          colorTextBase: '#221533',
          colorBgContainer: 'rgba(255, 255, 255, 0.3)',
        },
      }}
    >
      <VaultPage />
    </ConfigProvider>
  )
}

export default App

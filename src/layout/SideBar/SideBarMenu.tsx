import { useState } from 'react'
import { ReactComponent as TradeIconDefault } from '../../assets/icons/trade.svg'
import { ReactComponent as TradeIconActive } from '../../assets/icons/trade-active.svg'
import { ReactComponent as VaultIconDefault } from '../../assets/icons/vault.svg'
import { ReactComponent as VaultIconActive } from '../../assets/icons/vault-active.svg'
import { ReactComponent as StatisticIconDefault } from '../../assets/icons/statistic.svg'
import { ReactComponent as StatisticIconActive } from '../../assets/icons/statistic-active.svg'
import { ReactComponent as NftIconDefault } from '../../assets/icons/nft.svg'
import { ReactComponent as NftIconActive } from '../../assets/icons/nft-active.svg'
import SideBarMenuItem from './SideBarMenuItem'
import styles from './SideBarMenu.module.scss'

const items = [
  {
    id: 'trade',
    label: 'Trade',
    icon: {
      default: <TradeIconDefault />,
      active: <TradeIconActive />,
    },
  },
  {
    id: 'vault',
    label: 'Vault',
    icon: {
      default: <VaultIconDefault />,
      active: <VaultIconActive />,
    },
  },
  {
    id: 'statistic',
    label: 'Statistic',
    icon: {
      default: <StatisticIconDefault />,
      active: <StatisticIconActive />,
    },
  },
  {
    id: 'nft',
    label: 'NFT',
    icon: {
      default: <NftIconDefault />,
      active: <NftIconActive />,
    },
  },
]

function SideBarMenu() {
  const [selectedId, setSelectedId] = useState('vault')

  return (
    <div className={styles.menu}>
      {items.map((item) => (
        <SideBarMenuItem
          key={item.id}
          id={item.id}
          label={item.label}
          icon={item.icon}
          isActive={item.id === selectedId}
          onClick={setSelectedId}
        />
      ))}
    </div>
  )
}

export default SideBarMenu

import { useState } from 'react'
import { Row } from 'antd'
import { Graph, MagicStar, Strongbox } from 'iconsax-react'
import { ReactComponent as TradeIconDefault } from '@assets/icons/trade.svg'
import { ReactComponent as TradeIconActive } from '@assets/icons/trade-active.svg'
import { COLORS } from '@constants/colors'
import MenuItem from './MenuItem'

const items = [
  {
    id: 'trade',
    label: 'Trade',
    icon: {
      default: <TradeIconDefault width={20} height={20} />,
      active: <TradeIconActive width={20} height={20} />,
    },
  },
  {
    id: 'vault',
    label: 'Vault',
    icon: {
      default: <Strongbox size={20} />,
      active: <Strongbox variant="Bold" color={COLORS.IRIS_100} size={20} />,
    },
  },
  {
    id: 'statistic',
    label: 'Statistic',
    icon: {
      default: <Graph size={20} />,
      active: <Graph variant="Bold" color={COLORS.IRIS_100} size={20} />,
    },
  },
  {
    id: 'nft',
    label: 'NFT',
    icon: {
      default: <MagicStar size={20} />,
      active: <MagicStar variant="Bold" color={COLORS.IRIS_100} size={20} />,
    },
  },
]

function SideBarMenu() {
  const [selectedId, setSelectedId] = useState('vault')

  return (
    <Row justify="center" align="middle">
      {items.map((item) => (
        <MenuItem
          key={item.id}
          id={item.id}
          label={item.label}
          icon={item.icon}
          isActive={item.id === selectedId}
          onClick={setSelectedId}
        />
      ))}
    </Row>
  )
}

export default SideBarMenu

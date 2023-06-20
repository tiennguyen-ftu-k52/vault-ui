import { useState } from 'react'
import { Row } from 'antd'
import { Graph, MagicStar, Strongbox } from 'iconsax-react'
import { ReactComponent as TradeIconDefault } from '../../../assets/icons/trade.svg'
import { ReactComponent as TradeIconActive } from '../../../assets/icons/trade-active.svg'
import { COLORS } from '../../../constants/colors'
import MenuItem from './MenuItem'

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
      default: <Strongbox />,
      active: <Strongbox variant="Bold" color={COLORS.IRIS_100} />,
    },
  },
  {
    id: 'statistic',
    label: 'Statistic',
    icon: {
      default: <Graph />,
      active: <Graph variant="Bold" color={COLORS.IRIS_100} />,
    },
  },
  {
    id: 'nft',
    label: 'NFT',
    icon: {
      default: <MagicStar />,
      active: <MagicStar variant="Bold" color={COLORS.IRIS_100} />,
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

import cs from 'classnames'
import styles from './MenuItem.module.scss'

interface Props {
  id: string
  label: string
  icon: {
    default: React.ReactNode
    active: React.ReactNode
  }
  isActive: boolean
  onClick: (id: string) => void
}

function SideBarMenuItem({ id, label, icon, isActive, onClick }: Props) {
  return (
    <a
      className={cs(styles.item, isActive && styles.itemActive)}
      onClick={() => onClick(id)}
    >
      <span className={styles.icon}>
        {isActive ? icon.active : icon.default}
      </span>
      <span className={cs(styles.label, isActive && styles.labelActive)}>
        {label}
      </span>
    </a>
  )
}

export default SideBarMenuItem

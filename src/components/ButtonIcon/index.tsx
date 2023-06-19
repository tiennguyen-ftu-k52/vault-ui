import { Button } from 'antd'
import styles from './index.module.scss'

interface Props {
  icon: React.ReactNode
}

function ButtonIcon(props: Props) {
  return <Button className={styles.buttonIcon} icon={props.icon} />
}

export default ButtonIcon

import cs from 'classnames'
import styles from './index.module.scss'

interface Props {
  text: string
  icon: string
  className?: string
}

function DisplayToken({ text, icon, className }: Props) {
  return (
    <div className={cs(styles.container, className)}>
      <img src={icon} className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </div>
  )
}

export default DisplayToken

import { Input, InputProps } from 'antd'
import cs from 'classnames'
import styles from './index.module.scss'

function InputDuration({ className, ...rest }: InputProps) {
  return (
    <div className={styles.container}>
      <Input className={cs(styles.input, className)} {...rest} />
      <span className={styles.textSuffix}>days</span>
    </div>
  )
}

export default InputDuration

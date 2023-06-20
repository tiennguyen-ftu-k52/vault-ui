import { Input, InputProps } from 'antd'
import cs from 'classnames'
import styles from './index.module.scss'

function InputToken({ className, ...rest }: InputProps) {
  return (
    <div>
      <Input className={cs(styles.input, className)} {...rest} />
    </div>
  )
}

export default InputToken

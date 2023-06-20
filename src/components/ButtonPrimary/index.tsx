import { Button, ButtonProps } from 'antd'
import cs from 'classnames'
import styles from './index.module.scss'

function ButtonPrimary({ children, className, ...rest }: ButtonProps) {
  return (
    <Button className={cs(styles.buttonPrimary, className)} {...rest}>
      {children}
    </Button>
  )
}

export default ButtonPrimary

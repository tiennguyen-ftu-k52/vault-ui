import { Button, ButtonProps } from 'antd'
import cs from 'classnames'
import styles from './index.module.scss'

function PrimaryButton({ children, className, ...rest }: ButtonProps) {
  return (
    <Button className={cs(styles.primaryButton, className)} {...rest}>
      {children}
    </Button>
  )
}

export default PrimaryButton

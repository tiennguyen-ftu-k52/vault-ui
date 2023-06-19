import { Button, ButtonProps } from 'antd'
import styles from './index.module.scss'

function PrimaryButton({ children, ...rest }: ButtonProps) {
  return (
    <Button className={styles.primaryButton} {...rest}>
      {children}
    </Button>
  )
}

export default PrimaryButton

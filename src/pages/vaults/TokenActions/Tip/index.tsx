import { Divider, Row } from 'antd'
import { ReactComponent as ArrowDownIcon } from '@assets/icons/arrow-down.svg'
import styles from './index.module.scss'

interface Props {
  title: string
  content: string
  footer?: string | React.ReactNode
}

function Tip({ title, content, footer }: Props) {
  return (
    <div className={styles.tipContainer}>
      <Row className={styles.tipHeading} justify="space-between" align="middle">
        <span className={styles.tipTitle}>{title}</span>
        <ArrowDownIcon className={styles.tipIcon} />
      </Row>
      <div className={styles.tipContent}>{content}</div>
      {footer && (
        <>
          <Divider style={{ margin: '16px 0' }} />
          <div className={styles.tipFooter}>{footer}</div>
        </>
      )}
    </div>
  )
}

export default Tip

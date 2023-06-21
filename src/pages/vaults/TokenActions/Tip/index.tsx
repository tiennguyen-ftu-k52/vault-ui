import { Row } from 'antd'
import { ReactComponent as ArrowDownIcon } from '../../../../assets/icons/arrow-down.svg'
import styles from './index.module.scss'

interface Props {
  title: string
  content: string
}

function Tip({ title, content }: Props) {
  return (
    <div className={styles.tipContainer}>
      <Row className={styles.tipHeading} justify="space-between" align="middle">
        <span className={styles.tipTitle}>{title}</span>
        <ArrowDownIcon className={styles.tipIcon} />
      </Row>

      <div className={styles.tipContent}>{content}</div>
    </div>
  )
}

export default Tip

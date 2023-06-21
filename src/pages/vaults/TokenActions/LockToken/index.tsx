import { Divider, Row } from 'antd'
import cs from 'classnames'
import { ReactComponent as CheckboxUnchecked } from '../../../../assets/icons/checkbox-unchecked.svg'
import { ReactComponent as CheckboxChecked } from '../../../../assets/icons/checkbox-checked.svg'
import InputDuration from './InputDuration'
import TagListDuration from './TagListDuration'
import styles from './index.module.scss'

interface Props {
  checked: boolean
  setChecked: (checked: boolean) => void
}

function LockToken({ checked, setChecked }: Props) {
  return (
    <>
      <div
        className={cs(
          styles.checkboxContainer,
          checked && styles.checkboxContainerActive,
        )}
      >
        <a
          className={cs(styles.checkbox, checked && styles.checkboxActive)}
          onClick={() => setChecked(!checked)}
        >
          {checked ? (
            <CheckboxChecked className={styles.checkboxIcon} />
          ) : (
            <CheckboxUnchecked className={styles.checkboxIcon} />
          )}
          <span className={styles.checkboxText}>
            Lock & deposit to get discount
          </span>
        </a>
        {checked && <InputDuration value={123} />}
      </div>

      {checked && (
        <>
          <Row align="middle" justify="end">
            <div className={styles.discount}>
              <span className={styles.discountValue}>20%</span>
              <span className={styles.discountLabel}> discount</span>
            </div>
          </Row>

          <Divider style={{ margin: '16px 0 8px' }} />

          <div className={styles.durationListContainer}>
            <TagListDuration />
          </div>
        </>
      )}
    </>
  )
}

export default LockToken

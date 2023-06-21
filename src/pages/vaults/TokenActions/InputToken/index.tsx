import { Row } from 'antd'
import SelectInput from './SelectInput'
import NumberInput from './NumberInput'
import PercentageBar from './PercentageBar'
import { formatNumber } from '../../../../utils/number'
import styles from './index.module.scss'

interface Props {
  amount: string
  setAmount: (value: string) => void
  assetBalance: number
}

function InputToken({ amount, assetBalance, setAmount }: Props) {
  const percentage = Math.floor((Number(amount) / assetBalance) * 100)

  return (
    <div>
      <Row
        className={styles.inputBoxContainer}
        align="middle"
        justify="space-between"
      >
        <div className={styles.leftInputBox}>
          <div className={styles.boxTitle}>Deposit</div>
          <div className={styles.boxSubtitle}>
            <SelectInput />
          </div>
        </div>

        <div className={styles.rightInputBox}>
          <NumberInput
            placeholder="0"
            value={amount}
            onChange={setAmount}
            className={styles.select}
          />
          <div className={styles.value}>
            <span className={styles.balanceLabel}>Balance: </span>
            <a className={styles.balanceValue}>{formatNumber(assetBalance)}</a>
          </div>
        </div>
      </Row>

      <div className={styles.percentageContainer}>
        <PercentageBar
          percentage={percentage}
          setPercentage={(percentage) => {
            setAmount(`${(percentage / 100) * assetBalance}`)
          }}
        />
      </div>
    </div>
  )
}

export default InputToken

import { Row, Space } from 'antd'
import SelectInput from './SelectInput'
import NumberInput from './NumberInput'
import PercentageBar from './PercentageBar'
import { formatNumber } from '../../../../utils/number'
import styles from './index.module.scss'

interface Props {
  amount: string
  title: string
  setAmount: (value: string) => void
  balance: number
}

function InputToken({ amount, title, balance, setAmount }: Props) {
  const percentage = Math.floor((Number(amount) / balance) * 100)

  return (
    <Space size={24} direction="vertical">
      <Row align="middle" justify="space-between">
        <div className={styles.leftInputBox}>
          <div className={styles.boxTitle}>{title}</div>
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
            <a className={styles.balanceValue}>{formatNumber(balance)}</a>
          </div>
        </div>
      </Row>

      <PercentageBar
        percentage={percentage}
        setPercentage={(percentage) => {
          setAmount(`${(percentage / 100) * balance}`)
        }}
      />
    </Space>
  )
}

export default InputToken

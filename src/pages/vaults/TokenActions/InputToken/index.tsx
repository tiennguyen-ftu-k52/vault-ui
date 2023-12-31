import { Row, Space } from 'antd'
import SelectInput from './SelectInput'
import NumberInput from './NumberInput'
import PercentageBar from './PercentageBar'
import { formatNumber } from '@utils/number'
import styles from './index.module.scss'
import { SelectOption } from '@interfaces/select'

interface Props {
  amount: string
  title: string
  setAmount: (value: string) => void
  balance: number
  tokenOptions: SelectOption[]
}

function InputToken({
  amount,
  title,
  balance,
  setAmount,
  tokenOptions,
}: Props) {
  const percentage = Math.floor((Number(amount) / balance) * 100)

  return (
    <Space size={24} direction="vertical">
      <Row
        align="middle"
        justify="space-between"
        className={styles.boxContainer}
      >
        <div className={styles.leftInputBox}>
          <div className={styles.boxTitle}>{title}</div>
          <div className={styles.boxSubtitle}>
            <SelectInput options={tokenOptions} />
          </div>
        </div>

        <div className={styles.rightInputBox}>
          <NumberInput placeholder="0" value={amount} onChange={setAmount} />
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

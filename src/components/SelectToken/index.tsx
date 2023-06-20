import { Select, SelectProps } from 'antd'
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow-down.svg'
import TokenHeadColorIcon from '../../assets/icons/token-head-color.png'
import styles from './index.module.scss'
import DisplayToken from '../DisplayToken'

const OPTIONS = [
  {
    value: 'dai',
    label: (
      <DisplayToken
        className={styles.displayToken}
        text={'DAI'}
        icon={TokenHeadColorIcon}
      />
    ),
  },
]

function SelectToken(props: SelectProps) {
  return (
    <Select
      className={styles.select}
      bordered={false}
      labelInValue
      options={OPTIONS}
      value={OPTIONS[0]}
      suffixIcon={<ArrowDownIcon className={styles.suffixIcon} />}
      {...props}
    />
  )
}

export default SelectToken

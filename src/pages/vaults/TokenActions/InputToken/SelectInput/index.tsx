import { Select, SelectProps } from 'antd'
import cs from 'classnames'
import { ReactComponent as ArrowDownIcon } from '@assets/icons/arrow-down.svg'
import DisplayToken from '../../DisplayToken'
import { SelectOption } from '@interfaces/select'
import styles from './index.module.scss'

interface Props extends SelectProps {
  options: SelectOption[]
}

function SelectInput({ options, className, ...rest }: Props) {
  return (
    <Select
      className={cs(styles.select, className)}
      bordered={false}
      options={options.map((opt) => ({
        value: opt.value,
        label: <DisplayToken text={opt.label} icon={opt.icon} />,
      }))}
      value={options[0].value}
      suffixIcon={<ArrowDownIcon className={styles.suffixIcon} />}
      {...rest}
    />
  )
}

export default SelectInput

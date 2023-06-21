import { Input } from 'antd'
import cs from 'classnames'
import styles from './index.module.scss'

interface Props {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
}

function NumberInput({ value, onChange, placeholder, className }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target
    const reg = /^-?\d*(\.\d*)?$/
    if (reg.test(inputValue) || inputValue === '') {
      onChange(inputValue)
    }
  }

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value
    if (value.charAt(value.length - 1) === '.') {
      valueTemp = value.slice(0, -1)
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'))
  }

  return (
    <div>
      <Input
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={cs(styles.input, className)}
      />
    </div>
  )
}

export default NumberInput

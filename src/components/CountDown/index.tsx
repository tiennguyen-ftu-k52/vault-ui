import { useEffect, useState } from 'react'
import { convertSecondsToString } from '../../utils/dateTime'
import styles from './index.module.scss'

interface Props {
  seconds: number
  onCountdownEnd?: () => void
}

function CountDown({ seconds, onCountdownEnd }: Props) {
  const [remainingSeconds, setRemainingSeconds] = useState(seconds)

  useEffect(() => {
    let countdownTimeout: NodeJS.Timeout

    if (remainingSeconds > 0) {
      countdownTimeout = setTimeout(() => {
        setRemainingSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)
    } else if (remainingSeconds === 0 && onCountdownEnd) {
      setRemainingSeconds(seconds)
      onCountdownEnd()
    }

    return () => {
      clearTimeout(countdownTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSeconds])

  const formattedTime = convertSecondsToString(remainingSeconds)

  return <span className={styles.countdown}>{formattedTime}</span>
}

export default CountDown

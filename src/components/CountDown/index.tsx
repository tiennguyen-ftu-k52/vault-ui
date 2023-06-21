import { useEffect, useState } from 'react'
import { convertSecondsToString } from '../../utils/dateTime'
import styles from './index.module.scss'
import { renderFallback } from '../../utils/common'

interface Props {
  seconds: number
  secondsOnReset?: number
  onCountdownEnd?: () => void
}

function CountDown({ seconds, secondsOnReset, onCountdownEnd }: Props) {
  const [remainingSeconds, setRemainingSeconds] = useState(seconds)

  useEffect(() => {
    let countdownTimeout: NodeJS.Timeout

    if (remainingSeconds > 0) {
      countdownTimeout = setTimeout(() => {
        setRemainingSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)
    } else if (remainingSeconds === 0) {
      if (secondsOnReset !== undefined) setRemainingSeconds(secondsOnReset)
      if (onCountdownEnd) onCountdownEnd()
    }

    return () => {
      clearTimeout(countdownTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSeconds])

  const formattedTime = convertSecondsToString(remainingSeconds)

  return (
    <span className={styles.countdown}>{renderFallback(formattedTime)}</span>
  )
}

export default CountDown

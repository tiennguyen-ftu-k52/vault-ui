import { DATETIME_FORMAT } from '@constants/dateTime'
import { dateFormatter } from './dateTime'

interface Params {
  refreshRate: number
  roundsPassed: number
  roundsPerEpoch: number
}

export function calcEpochTimeLeft({
  refreshRate,
  roundsPassed,
  roundsPerEpoch,
}: Params) {
  const refreshRateInSeconds = refreshRate / 1000
  const epochTimeLeft = (roundsPerEpoch - roundsPassed) * refreshRateInSeconds
  return epochTimeLeft
}

export function calcDurationTimestamps({
  refreshRate,
  roundsPassed,
  roundsPerEpoch,
}: Params) {
  const now = new Date().getTime()
  const start = now - roundsPassed * refreshRate
  const end = start + roundsPerEpoch * refreshRate
  return {
    start: dateFormatter(start).format(DATETIME_FORMAT.LONG_DATE),
    end: dateFormatter(end).format(DATETIME_FORMAT.LONG_DATE),
  }
}

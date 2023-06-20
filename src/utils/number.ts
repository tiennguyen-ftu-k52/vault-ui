import * as numeral from 'numeral'

export function formatInt(value: number, format = '0,0') {
  return numeral(value).format(format)
}

export function formatFloat(value: number, format = '0,0.00') {
  return numeral(value).format(format)
}

import * as numeral from 'numeral'

export function formatInt(value: number, format = '0,0') {
  return numeral(value).format(format)
}

export function formatFloat(value: number, format = '0,0.00') {
  return numeral(value).format(format)
}

const formatter = new Intl.NumberFormat()
export function formatBigInt(bigint: bigint) {
  return formatter.format(bigint)
}

export function isNum(param: unknown): param is number | bigint {
  return typeof param === 'number' || typeof param === 'bigint'
}

import * as numeral from 'numeral'

export function isNum(param: unknown): param is number | bigint {
  return typeof param === 'number' || typeof param === 'bigint'
}

function formatInt(value: number) {
  return numeral(value).format('0,0')
}

function formatFloat(value: number) {
  return numeral(value).format('0,0.00')
}

export function formatNumber(value: number) {
  return Number.isInteger(value) ? formatInt(value) : formatFloat(value)
}

export function formatPercentage(value: number) {
  return `${formatNumber(value)}%`
}

export function formatCurrency(value: number) {
  return `$${formatNumber(value)}`
}

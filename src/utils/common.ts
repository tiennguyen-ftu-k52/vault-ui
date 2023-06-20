const FALLBACK = '-'

export function renderFallback(value?: string | number | null) {
  if (typeof value === 'string') {
    return value || FALLBACK
  }

  if (typeof value === 'number') {
    return `${value}`
  }

  return FALLBACK
}

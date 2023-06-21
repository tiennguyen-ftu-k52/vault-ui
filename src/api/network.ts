import { apiGenerator } from './base'

export async function getStats(apiAddress: string) {
  return apiGenerator(apiAddress, 'stats')
}

export async function getEconomics(apiAddress: string) {
  return apiGenerator(apiAddress, 'economics')
}

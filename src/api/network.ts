import axios from 'axios'

async function apiGenerator(apiAddress: string, path: string) {
  const endpoint = `${apiAddress}/${path}`
  const response = await axios.get(endpoint)
  return response.data
}

export async function getStats(apiAddress: string) {
  return apiGenerator(apiAddress, 'stats')
}

export async function getEconomics(apiAddress: string) {
  return apiGenerator(apiAddress, 'economics')
}

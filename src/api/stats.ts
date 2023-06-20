import axios from 'axios'

export async function getStats(apiAddress: string) {
  const endpoint = `${apiAddress}/stats`
  const response = await axios.get(endpoint)
  return response.data
}

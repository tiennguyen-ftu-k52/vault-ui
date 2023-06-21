import axios from 'axios'

export async function apiGenerator(apiAddress: string, path: string) {
  const endpoint = `${apiAddress}/${path}`
  const response = await axios.get(endpoint)
  return response.data
}

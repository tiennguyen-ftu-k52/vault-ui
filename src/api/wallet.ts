import { apiGenerator } from './base'

export async function getWalletTokens(
  apiAddress: string,
  walletAddress: string,
) {
  return apiGenerator(apiAddress, `accounts/${walletAddress}/tokens`)
}

import { ASSET_TOKEN, BIGINT_UNIT, SHARE_TOKEN } from '@constants/contract'
import { WalletToken } from '@interfaces/wallet'

export function formatWalletAddress(address: string) {
  return `${address.slice(0, 10)}...${address.slice(-4)}`
}

function getTokenBalance(tokens: WalletToken[] | undefined, tokenId: string) {
  if (!tokens) return 0
  const token = tokens.find((token) => token.identifier === tokenId)
  return token ? Number(token.balance) / BIGINT_UNIT : 0
}

export function getShareTokenBalance(tokens: WalletToken[] | undefined) {
  return getTokenBalance(tokens, SHARE_TOKEN)
}

export function getAssetTokenBalance(tokens: WalletToken[] | undefined) {
  return getTokenBalance(tokens, ASSET_TOKEN)
}

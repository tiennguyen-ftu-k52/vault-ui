export interface Assets {
  website: string
  description: string
  status: 'inactive'
  pngUrl: string
  svgUrl: string
  ledgerSignature: string
  lockedAccounts: string
  extraTokens: [string]
  preferredRankAlgorithm: string
}

export interface WalletToken {
  type: string
  identifier: string
  collection: string
  nonce: number
  name: string
  ticker: string
  owner: string
  minted: string
  burnt: string
  initialMinted: string
  decimals: number
  isPaused: boolean
  assets: Assets
  transactions: number
  accounts: number
  canUpgrade: boolean
  canMint: boolean
  canBurn: boolean
  canChangeOwner: boolean
  canAddSpecialRoles: boolean
  canPause: boolean
  canFreeze: boolean
  canWipe: boolean
  canTransferNftCreateRole: boolean
  price: number
  marketCap: number
  supply: string
  circulatingSupply: string
  timestamp: number
  balance: string
  valueUsd: number
  attributes: string
}

export interface Stats {
  accounts: number
  blocks: number
  epoch: number
  refreshRate: number
  roundsPassed: number
  roundsPerEpoch: number
  shards: number
  transactions: number
  scResults: number
}

export interface Economics {
  totalSupply: number
  circulatingSupply: number
  staked: number
  price: number
  marketCap: number
  apr: number
  topUpApr: number
  baseApr: number
  minimumAuctionTopUp: string
  tokenMarketCap: number
}

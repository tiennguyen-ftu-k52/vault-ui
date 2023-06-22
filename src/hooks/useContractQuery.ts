import {
  useGetAccountInfo,
  useGetNetworkConfig,
} from '@multiversx/sdk-dapp/hooks'
import { useQuery } from 'react-query'
import { WalletToken } from '../interfaces/wallet'
import { getWalletTokens } from '../api/wallet'
import {
  getCollatRatio,
  getMaxAccPnlPerToken,
  getShareToAssetsPrice,
  getTotalSupply,
} from '../api/vaultContract'
import { getAssetTokenBalance, getShareTokenBalance } from '../utils/wallet'

export function useContractQuery() {
  const {
    network: { apiAddress },
  } = useGetNetworkConfig()
  const { address } = useGetAccountInfo()

  const { data: tokens, refetch: refetchTokens } = useQuery<WalletToken[]>({
    queryKey: ['tokens', apiAddress, address],
    queryFn: () => getWalletTokens(apiAddress, address),
    enabled: !!apiAddress && !!address,
  })

  const shareTokenBalance = getShareTokenBalance(tokens)

  const assetsTokenBalance = getAssetTokenBalance(tokens)

  const { data: shareToAssetsPrice, refetch: refetchShareToAssetsPrice } =
    useQuery<number>({
      queryKey: ['shareToAssetsPrice'],
      queryFn: getShareToAssetsPrice,
    })

  const { data: collatRatio, refetch: refetchCollatRatio } = useQuery<number>({
    queryKey: ['collatRatio'],
    queryFn: getCollatRatio,
  })

  const { data: totalSupply, refetch: refetchTotalSupply } = useQuery<number>({
    queryKey: ['totalSupply'],
    queryFn: getTotalSupply,
  })

  const { data: maxAccPnlPerToken, refetch: refetchMaxAccPnlPerToken } =
    useQuery<number>({
      queryKey: ['maxAccPnlPerToken'],
      queryFn: getMaxAccPnlPerToken,
    })

  function refetchContractQueries() {
    refetchTokens()
    refetchShareToAssetsPrice()
    refetchCollatRatio()
    refetchTotalSupply()
    refetchMaxAccPnlPerToken()
  }

  return {
    tokens,
    shareTokenBalance,
    assetsTokenBalance,
    shareToAssetsPrice,
    collatRatio,
    totalSupply,
    maxAccPnlPerToken,
    refetchContractQueries,
  }
}

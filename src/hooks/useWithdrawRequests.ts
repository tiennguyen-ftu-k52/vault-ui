import { useQuery } from 'react-query'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks'
import { WithdrawRequest } from '../interfaces/withdraw'
import { getWithdrawRequests } from '../api/vaultContract'

export function useWithdrawRequests() {
  const { address } = useGetAccountInfo()
  const { data: withdrawRequests, refetch: refetchWithdrawRequests } = useQuery<
    WithdrawRequest[]
  >({
    queryKey: ['withdrawRequests'],
    queryFn: () => getWithdrawRequests(address),
    enabled: !!address,
  })

  return { withdrawRequests, refetchWithdrawRequests }
}

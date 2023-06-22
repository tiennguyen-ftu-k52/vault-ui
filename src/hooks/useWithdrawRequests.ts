import { useQuery } from 'react-query'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks'
import { WithdrawRequest } from '../interfaces/withdraw'
import { getWithdrawRequests } from '../api/vaultContract'

export interface UseWithdrawRequests {
  withdrawRequests: WithdrawRequest[] | undefined
  refetchWithdrawRequests: () => void
  fetchingWithdrawRequests: boolean
}

export function useWithdrawRequests(): UseWithdrawRequests {
  const { address } = useGetAccountInfo()
  const {
    data: withdrawRequests,
    refetch: refetchWithdrawRequests,
    isFetching: fetchingWithdrawRequests,
  } = useQuery<WithdrawRequest[]>({
    queryKey: ['withdrawRequests'],
    queryFn: () => getWithdrawRequests(address),
    enabled: !!address,
  })

  return { withdrawRequests, refetchWithdrawRequests, fetchingWithdrawRequests }
}

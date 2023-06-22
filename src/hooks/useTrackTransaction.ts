import { useState } from 'react'
import {
  useTrackTransactionStatus,
  UseTrackTransactionStatusArgsType,
} from '@multiversx/sdk-dapp/hooks'
import { useContractQuery } from './useContractQuery'
import { notification } from 'antd'

interface Session {
  id: UseTrackTransactionStatusArgsType['transactionId']
  message?: string
}

export function useTrackTransaction() {
  const [tx, setTx] = useState<Session | null>(null)
  const { refetchQueries } = useContractQuery()

  useTrackTransactionStatus({
    transactionId: tx?.id || null,
    onSuccess() {
      if (tx?.message) {
        notification.success({
          message: tx.message,
        })
      }
      setTx(null)
      refetchQueries()
    },
  })

  return {
    trackTransaction: setTx,
  }
}

import { useState } from 'react'
import {
  useTrackTransactionStatus,
  UseTrackTransactionStatusArgsType,
} from '@multiversx/sdk-dapp/hooks'

interface Session {
  id: UseTrackTransactionStatusArgsType['transactionId']
  onSuccess?: () => void
  onError?: () => void
  onCancelled?: () => void
}

export function useTrackTransaction() {
  const [tx, setTx] = useState<Session | null>(null)

  useTrackTransactionStatus({
    transactionId: tx?.id || null,
    onSuccess() {
      setTx(null)
      if (tx?.onSuccess) {
        tx.onSuccess()
      }
    },
    onFail() {
      setTx(null)
      if (tx?.onError) {
        tx.onError()
      }
    },
    onCancelled() {
      setTx(null)
      if (tx?.onCancelled) {
        tx.onCancelled()
      }
    },
  })

  return {
    trackTransaction: setTx,
  }
}

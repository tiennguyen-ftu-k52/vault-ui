import { useState } from 'react'
import {
  useTrackTransactionStatus,
  UseTrackTransactionStatusArgsType,
} from '@multiversx/sdk-dapp/hooks'
import { notification } from 'antd'

interface Session {
  id: UseTrackTransactionStatusArgsType['transactionId']
  message?: string
  successAction?: () => void
}

export function useTrackTransaction() {
  const [tx, setTx] = useState<Session | null>(null)

  useTrackTransactionStatus({
    transactionId: tx?.id || null,
    onSuccess() {
      if (tx?.message) {
        notification.success({
          message: tx.message,
        })
      }
      if (tx?.successAction) {
        tx.successAction()
      }
      setTx(null)
    },
  })

  return {
    trackTransaction: setTx,
  }
}

import React, { createContext, useState } from 'react'

export interface LoadingContextType {
  loading: boolean
  setLoadingState: (isLoading: boolean) => void
}

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined,
)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [counter, setCounter] = useState(0)

  const setLoadingState = (isLoading: boolean) => {
    if (isLoading) {
      setCounter((prevCounter) => prevCounter + 1)
      setLoading(true)
    } else {
      setCounter((prevCounter) => prevCounter - 1)
      if (counter <= 1) {
        setLoading(false)
      }
    }
  }

  const contextValue: LoadingContextType = {
    loading,
    setLoadingState,
  }

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  )
}

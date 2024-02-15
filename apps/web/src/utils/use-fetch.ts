import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'

export type UseRequestState<T> = {
  status: 'idle' | 'pending' | 'resolved' | 'rejected' | 'cancelled'
  data: T | null
  error: string | null
  cancel: () => void
}

export default function useRequest<T>() {
  const router = useRouter()
  const abortControllerRef = useRef<AbortController | undefined>(undefined)

  const [state, setState] = useState<UseRequestState<T>>(() => ({
    status: 'idle',
    data: null,
    error: null,
    cancel: () => abortControllerRef.current?.abort(),
  }))

  const handle = useCallback(
    async (
      url: string,
      options: RequestInit,
      {
        onError,
        onSuccess,
      }: {
        onSuccess?: (data: T) => void
        onError?: (error: string) => void
      } = {},
    ) => {
      const abortController = new AbortController()
      abortControllerRef.current = abortController

      setState({
        status: 'pending',
        data: null,
        error: null,
        cancel: () => abortControllerRef.current?.abort(),
      })

      try {
        const response = await fetch(url, {
          ...options,
          signal: abortControllerRef.current.signal,
        })

        if (response.ok) {
          const redirectUrl = response.headers.get('Location')
          if (redirectUrl) router.push(redirectUrl)

          const data = await response.json()
          setState({
            status: 'resolved',
            data,
            error: null,
            cancel: () => abortControllerRef.current?.abort(),
          })
          onSuccess?.(data)
        } else {
          let data = { error: 'An error occurred' }
          try {
            data = await response.json()
          } catch {}
          setState({
            status: 'rejected',
            data: null,
            error: data.error,
            cancel: () => abortControllerRef.current?.abort(),
          })
          onError?.(data.error)
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          setState({
            status: 'cancelled',
            data: null,
            error: error.message,
            cancel: () => abortControllerRef.current?.abort(),
          })
        } else {
          const message =
            error instanceof Error ? error.message : 'An error occurred'
          setState({
            status: 'rejected',
            data: null,
            error: message,
            cancel: () => abortControllerRef.current?.abort(),
          })
          onError?.(message)
        }
      }
    },
    [router],
  )

  return [handle, state] as const
}

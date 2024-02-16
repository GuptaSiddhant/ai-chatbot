import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

export type UseRequestState<T> = {
  status: 'idle' | 'pending' | 'resolved' | 'rejected' | 'cancelled'
  data: T | null
  error: string | null
}

export type RequestCallback<T> = (
  request: Request,
  options?: {
    onSuccess?: (data: T) => void
    onError?: (error: string) => void
  },
) => void

export default function useRequest<T>() {
  const router = useRouter()

  const [state, setState] = useState<UseRequestState<T>>(() => ({
    status: 'idle',
    data: null,
    error: null,
  }))

  const handle: RequestCallback<T> = useCallback(
    async (request, { onError, onSuccess } = {}) => {
      setState({
        status: 'pending',
        data: null,
        error: null,
      })

      try {
        const response = await fetch(request)

        if (response.redirected) {
          const redirectUrl = response.url || response.headers.get('Location')
          return router.push(redirectUrl || '/')
        }

        if (response.ok) {
          const data = await response.json()
          setState({
            status: 'resolved',
            data,
            error: null,
          })
          onSuccess?.(data)
        } else {
          let data = { error: 'An error occurred' }
          try {
            data = await response.json()
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
          }
          setState({
            status: 'rejected',
            data: null,
            error: data.error,
          })
          onError?.(data.error)
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          setState({
            status: 'cancelled',
            data: null,
            error: error.message,
          })
        } else {
          const message =
            error instanceof Error ? error.message : 'An error occurred'
          setState({
            status: 'rejected',
            data: null,
            error: message,
          })
          onError?.(message)
        }
      }
    },
    [router],
  )

  return [handle, state] as const
}

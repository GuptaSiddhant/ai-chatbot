import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

export default function useFetch<T>() {
  const router = useRouter()
  const [fetchState, setFetchState] = useState<{
    status: 'idle' | 'pending' | 'resolved' | 'rejected'
    data: T | null
    error: string | null
  }>({
    status: 'idle',
    data: null,
    error: null,
  })

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
      setFetchState({ status: 'pending', data: null, error: null })
      const response = await fetch(url, options)

      if (response.ok) {
        if (response.redirected) {
          const redirectUrl = response.url || response.headers.get('Location')
          if (redirectUrl) router.push(redirectUrl)
        }

        const data = await response.json()
        setFetchState({ status: 'resolved', data, error: null })
        onSuccess?.(data)
      } else {
        let data = { error: 'An error occurred' }
        try {
          data = await response.json()
        } catch {}
        setFetchState({ status: 'rejected', data: null, error: data.error })
        onError?.(data.error)
      }
    },
    [router],
  )

  return [handle, fetchState] as const
}

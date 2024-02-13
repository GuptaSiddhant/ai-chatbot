import { PageLayout, Button, TextInput, Text } from '@ddp-bot/web-ui'
import Link from 'next/link'
import { useCallback } from 'react'
import useFetch from 'utils/use-fetch'

export default function Login() {
  const [makeRequest, fetchState] = useFetch()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      makeRequest('/api/login', { method: 'POST', body: formData })
    },
    [makeRequest],
  )

  return (
    <PageLayout>
      <Text type="h1" bottomMargin={'large'}>
        Login
      </Text>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <TextInput name="username" required />
        </label>
        <Button type="submit">Login</Button>
        {fetchState.error && <Text>{String(fetchState.error)}</Text>}
      </form>
      <Link href={'/register'}>Register here.</Link>
    </PageLayout>
  )
}

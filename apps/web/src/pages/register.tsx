import { PageLayout, Button, TextInput, Text } from '@ddp-bot/web-ui'
import Link from 'next/link'
import { useCallback } from 'react'
import useFetch from 'utils/use-fetch'

export default function Register() {
  const [makeRequest, fetchState] = useFetch()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      makeRequest('/api/register', { method: 'POST', body: formData })
    },
    [makeRequest],
  )

  return (
    <PageLayout>
      <Text type="h1" bottomMargin={'large'}>
        Register
      </Text>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <TextInput name="username" required minLength={3} />
        </label>

        <label>
          Full name:
          <TextInput name="name" required />
        </label>
        <Button type="submit" disabled={fetchState.status === 'pending'}>
          Register
        </Button>

        {fetchState.error && <Text>{String(fetchState.error)}</Text>}
      </form>
      <Link href={'/login'}>Already have an account? Login.</Link>
    </PageLayout>
  )
}

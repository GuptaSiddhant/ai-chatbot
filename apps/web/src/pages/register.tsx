import { Button, TextInput, Text, AuthLayout } from '@ddp-bot/web-ui'
import Link from 'next/link'
import { useCallback } from 'react'
import useFetch from 'utils/use-fetch'

export default function Register() {
  const [request, { error, status }] = useFetch()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      request('/api/register', { method: 'POST', body: formData })
    },
    [request],
  )

  return (
    <AuthLayout>
      <Text type="h2" bottomMargin={'large'}>
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
        <Button type="submit" disabled={status === 'pending'}>
          Register
        </Button>

        {error && <Text>{String(error)}</Text>}
      </form>
      <Link href={'/login'}>Already have an account? Login.</Link>
    </AuthLayout>
  )
}

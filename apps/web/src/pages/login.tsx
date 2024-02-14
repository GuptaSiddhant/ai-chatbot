import { Button, TextInput, Text, AuthLayout } from '@ddp-bot/web-ui'
import Link from 'next/link'
import { useCallback } from 'react'
import useRequest from 'utils/use-fetch'

export default function Login() {
  const [request, { error, status }] = useRequest()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      request('/api/login', { method: 'POST', body: formData })
    },
    [request],
  )

  return (
    <AuthLayout>
      <Text type="h2" bottomMargin={'large'}>
        Login
      </Text>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <TextInput name="username" required />
        </label>
        <Button type="submit" disabled={status === 'pending'}>
          Login
        </Button>
        {error && <Text>{String(error)}</Text>}
      </form>
      <Link href={'/register'}>Register here.</Link>
    </AuthLayout>
  )
}

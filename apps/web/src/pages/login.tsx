import { Button, TextInput, Text, AuthLayout } from '@ddp-bot/web-ui'
import Link from 'next/link'
import { useCallback } from 'react'
import { generateUnAuthGetServerSideProps } from 'utils/server-props'
import useRequest from 'utils/use-request'

export default function Login() {
  const [request, { error, status }] = useRequest()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      request(new Request('/api/login', { method: 'POST', body: formData }))
    },
    [request],
  )

  return (
    <AuthLayout>
      <Text type="h2" bottomMargin={'large'}>
        Login
      </Text>
      <form onSubmit={handleSubmit}>
        <TextInput label={'Username'} name="username" required />

        <Button type="submit" disabled={status === 'pending'}>
          Login
        </Button>
        {error && <Text>{String(error)}</Text>}
      </form>
      <Link href={'/register'}>Register here.</Link>
    </AuthLayout>
  )
}

export const getServerSideProps = generateUnAuthGetServerSideProps()

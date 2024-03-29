import { Button, TextInput, Text, AuthLayout } from '@ddp-bot/web-ui'
import Link from 'next/link'
import { useCallback } from 'react'
import { generateUnAuthGetServerSideProps } from 'utils/server-props'
import useRequest from 'utils/use-request'

export default function Register() {
  const [request, { error, status }] = useRequest()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      request(new Request('/api/register', { method: 'POST', body: formData }))
    },
    [request],
  )

  return (
    <AuthLayout>
      <Text type="h2" bottomMargin={'large'}>
        Register
      </Text>
      <form onSubmit={handleSubmit}>
        <TextInput label={'Username'} name="username" required minLength={3} />
        <TextInput label={'Full name'} name="name" required />

        <Button type="submit" disabled={status === 'pending'}>
          Register
        </Button>

        {error && <Text>{String(error)}</Text>}
      </form>
      <Link href={'/login'}>Already have an account? Login.</Link>
    </AuthLayout>
  )
}

export const getServerSideProps = generateUnAuthGetServerSideProps()

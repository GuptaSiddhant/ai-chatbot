import { useCreateChatMutation } from '@ddp-bot/database-api'
import { Button, TextInput } from '@ddp-bot/web-ui'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

export function NewSession({ userId }: { userId: string }) {
  const router = useRouter()
  const [createChat, { isLoading, isSuccess, data }] = useCreateChatMutation()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      createChat({ title: formData.get('title')?.toString()!, userId })
    },
    [createChat, userId],
  )

  useEffect(() => {
    if (isSuccess && data) {
      router.push(`/${data.id}`)
    }
  }, [isSuccess, data, router])

  return (
    <form
      onSubmit={handleSubmit}
      key={String(isSuccess)}
      className={'flex gap-2'}
    >
      <TextInput
        label={''}
        name="title"
        placeholder={'New session name'}
        required
        minLength={3}
      />
      <Button type={'submit'} disabled={isLoading}>
        Create
      </Button>
    </form>
  )
}

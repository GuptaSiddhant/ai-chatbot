import { useCreateConversationMutation } from '@ddp-bot/database-api'
import { Button, TextInput } from '@ddp-bot/web-ui'
import { useCallback } from 'react'
import useRequest from 'utils/use-fetch'

export function NewMessageForm({ chatId }: { chatId: string }) {
  const [request, { status, cancel }] = useRequest<{
    userMessage: string
    botMessage: string
  }>()
  const [createConversation, { isLoading, isSuccess }] =
    useCreateConversationMutation()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      request(
        '/api/ai',
        { method: 'POST', body: formData },
        {
          onSuccess(data) {
            console.log(data)
            createConversation({ chatId, ...data })
          },
        },
      )
    },
    [chatId, createConversation, request],
  )

  return (
    <form
      onSubmit={handleSubmit}
      key={String(isSuccess)}
      className={'flex gap-2'}
    >
      <TextInput
        name="message"
        placeholder={'Chat with AI'}
        required
        minLength={2}
        autoFocus={true}
        autoComplete={'off'}
        disabled={status === 'pending' || isLoading}
      />
      {status === 'pending' ? (
        <Button type={'button'} onClick={cancel}>
          Cancel
        </Button>
      ) : (
        <Button type={'submit'} disabled={isLoading}>
          Send
        </Button>
      )}
    </form>
  )
}

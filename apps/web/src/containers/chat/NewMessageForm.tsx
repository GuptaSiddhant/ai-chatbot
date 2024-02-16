import { useCreateConversationMutation } from '@ddp-bot/database-api'
import { ChatInput } from '@ddp-bot/web-ui'
import { useCallback } from 'react'
import useRequest from 'utils/use-request'

export function NewMessageForm({ chatId }: { chatId: string }) {
  const [request, { status }] = useRequest<{
    userMessage: string
    botMessage: string
  }>()
  const [createConversation, { isLoading, isSuccess }] =
    useCreateConversationMutation()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      request(new Request('/api/ai', { method: 'POST', body: formData }), {
        onSuccess: (data) => {
          createConversation({ chatId, ...data })
        },
      })
    },
    [chatId, createConversation, request],
  )

  return (
    <ChatInput
      key={String(isSuccess)}
      onSubmit={handleSubmit}
      isLoading={status === 'pending' || isLoading}
    >
      <input type="hidden" name="chatId" value={chatId} />
    </ChatInput>
  )
}

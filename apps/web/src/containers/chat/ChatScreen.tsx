import { useGetConversationsQuery } from '@ddp-bot/database-api'
import { NewMessageForm } from './NewMessageForm'
import { useEffect, useRef } from 'react'
import { ChatWindow as ChatWindowUI } from '@ddp-bot/web-ui'

export function ChatScreen({ chatId }: { chatId: string }) {
  const outputRef = useRef<HTMLOutputElement>(null)
  const { data: conversations = [] } = useGetConversationsQuery({ chatId })

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight)
  }, [conversations])

  return (
    <ChatWindowUI conversations={conversations}>
      <NewMessageForm chatId={chatId} />
    </ChatWindowUI>
  )
}

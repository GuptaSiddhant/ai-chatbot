import { useGetConversationsQuery } from '@ddp-bot/database-api'
import { NewMessageForm } from './NewMessageForm'
import { useEffect, useRef } from 'react'
import { ConversationBubbles } from './ConversationBubbles'

export function ChatWindow({ chatId }: { chatId: string }) {
  const outputRef = useRef<HTMLOutputElement>(null)
  const { data: conversations = [] } = useGetConversationsQuery({ chatId })

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight)
  }, [conversations])

  return (
    <div
      className={
        'p-2 h-full h-full w-full grid grid-rows-[1fr_max-content] overflow-hidden gap-4'
      }
    >
      <output
        className={'overflow-y-auto flex flex-col gap-8 mt-4'}
        ref={outputRef}
      >
        {conversations.map((conversation) => (
          <ConversationBubbles
            key={conversation.id}
            conversation={conversation}
          />
        ))}
      </output>
      <NewMessageForm chatId={chatId} />
    </div>
  )
}

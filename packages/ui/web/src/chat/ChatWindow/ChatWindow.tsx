import { IConversation } from '@ddp-bot/types'
import { ConversationBubbles } from 'chat/ConversationBubbles'
import { useEffect, useRef } from 'react'

export function ChatWindow({
  conversations,
  children,
}: {
  conversations: IConversation[]
  children: React.ReactNode
}) {
  const outputRef = useRef<HTMLOutputElement>(null)

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight)
  }, [conversations])

  return (
    <div
      className={
        'p-2 h-full w-full grid grid-rows-[1fr_max-content] overflow-hidden gap-4'
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
      {children}
    </div>
  )
}

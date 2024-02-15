import { useDeleteChatMutation } from '@ddp-bot/database-api'
import type { IChat } from '@ddp-bot/types'
import { ChatLink } from '@ddp-bot/web-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export function ChatItem({ chat }: { chat: IChat }) {
  const { asPath } = useRouter()
  const [deleteChat, { isLoading }] = useDeleteChatMutation()

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (confirm(`Are you sure you want to delete chat "${chat.title}"?`)) {
        deleteChat(chat.id)
      }
    },
    [chat, deleteChat],
  )

  return (
    <ChatLink
      key={chat.id}
      chat={chat}
      LinkComponent={Link}
      isActive={asPath === `/${chat.id}`}
      disabled={isLoading}
      onDelete={handleClick}
    />
  )
}

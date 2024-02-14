import { useDeleteChatMutation } from '@ddp-bot/database-api'
import type { IChat } from '@ddp-bot/types'
import Link from 'next/link'
import { useCallback } from 'react'

export function ChatLink({ chat }: { chat: IChat }) {
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
    <li key={chat.id}>
      <Link
        href={chat.id}
        className={
          'w-full px-4 py-2 truncate flex justify-between items-center border dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm'
        }
      >
        {chat.title}
        <button
          title={`Delete chat ${chat.title}`}
          type="button"
          className="px-2 px-1"
          disabled={isLoading}
          onClick={handleClick}
        >
          x
        </button>
      </Link>
    </li>
  )
}
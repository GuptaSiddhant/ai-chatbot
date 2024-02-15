import type { IChat } from '@ddp-bot/types'
import { CrossIcon } from 'icons'

export interface IChatLinkProps {
  chat: IChat
  isActive: boolean
  disabled: boolean
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
  LinkComponent?: (props: {
    href: string
    className: string
    children: React.ReactNode
  }) => JSX.Element | null
}

export function ChatLink({
  chat,
  isActive,
  LinkComponent,
  disabled,
  onDelete,
}: IChatLinkProps) {
  const Tag = LinkComponent ?? 'a'
  return (
    <li key={chat.id}>
      <Tag
        href={chat.id}
        className={[
          'w-full px-4 py-2 truncate flex justify-between items-center border dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm',
          isActive ? 'font-bold bg-slate-100 dark:bg-slate-800' : 'font-normal',
        ].join(' ')}
      >
        {chat.title}
        <button
          title={`Delete chat ${chat.title}`}
          type="button"
          className="px-1 px-1"
          disabled={disabled}
          onClick={onDelete}
        >
          <CrossIcon />
        </button>
      </Tag>
    </li>
  )
}

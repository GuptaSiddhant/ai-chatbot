import { PageLayout, Text } from '@ddp-bot/web-ui'
import Link from 'next/link'
import { NewSession } from './NewSession'
import { useGetChatsQuery, useGetUserQuery } from '@ddp-bot/database-api'
import { IChat } from '@ddp-bot/types'

export function Layout({
  children,
  userId,
}: {
  children: React.ReactNode
  userId: string
}) {
  const { data: user } = useGetUserQuery(userId)
  const { data: chats = [] } = useGetChatsQuery(userId)

  return (
    <PageLayout
      menuHeader={
        <Text type={'h4'}>
          <Link href={'/'}>DDP Chatbot</Link>
        </Text>
      }
      menuChildren={
        <section className={'min-h-0 overflow-hidden'}>
          <NewSession userId={userId} />
          <nav className="py-4 h-[calc(100%_-_40px)]">
            <ul className="flex gap-2 flex-col overflow-y-auto h-full">
              {chats.map((chat) => (
                <ChatItem key={chat.id} chat={chat} />
              ))}
            </ul>
          </nav>
        </section>
      }
      menuFooter={(collapsed) => (
        <a href={'/api/logout'} className="flex gap-2">
          <span>Icon</span>
          <span hidden={collapsed}>{user?.name || 'Account'}</span>
          <span hidden={collapsed}>{'Logout'}</span>
        </a>
      )}
    >
      {children}
    </PageLayout>
  )
}

function ChatItem({ chat }: { chat: IChat }) {
  return (
    <li key={chat.id}>
      <Link
        href={chat.id}
        className={
          'w-full px-4 py-2 truncate flex border dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-sm'
        }
      >
        {chat.title}
      </Link>
    </li>
  )
}

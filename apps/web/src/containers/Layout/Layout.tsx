import { LogoutIcon, PageLayout } from '@ddp-bot/web-ui'
import { NewSession } from './NewSession'
import { useGetChatsQuery, useGetUserQuery } from '@ddp-bot/database-api'
import { ChatItem } from './ChatItem'
import useRequest from 'utils/use-request'

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
      defaultCollapsed
      menuChildren={
        <>
          <NewSession userId={userId} />
          <nav className="py-4 h-[calc(100%_-_40px)]">
            <ul className="flex gap-2 flex-col overflow-y-auto h-full">
              {chats.map((chat) => (
                <ChatItem key={chat.id} chat={chat} />
              ))}
            </ul>
          </nav>
        </>
      }
      menuFooter={(collapsed) => (
        <Logout>
          <span hidden={collapsed}>
            {user?.name || 'Logout'} ({user?.username})
          </span>
        </Logout>
      )}
    >
      {children}
    </PageLayout>
  )
}

function Logout({ children }: { children: React.ReactNode }) {
  const [request] = useRequest()

  const handleClick = () => {
    request(new Request('/api/logout'))
  }

  return (
    <button
      title={'Logout'}
      className="flex gap-2 items-center px-2"
      onClick={handleClick}
    >
      <LogoutIcon />
      {children}
    </button>
  )
}

import { Text } from '@ddp-bot/web-ui'
import {
  useGetChatsQuery,
  getUser,
  getChats,
  useGetUserQuery,
} from '@ddp-bot/api'
import { generateAuthGetServerSideProps } from 'utils/auth-server-props'

interface IndexPageProps {
  userId: string
}

export default function IndexPage(props: IndexPageProps) {
  const { data: user } = useGetUserQuery(props.userId)
  const { data: chats } = useGetChatsQuery(props.userId)

  return (
    <>
      <Text type="h1" bottomMargin={'large'}>
        DDP Chatbot {user?.name}
      </Text>
      <a href={'/api/logout'}>Logout</a>
      <pre>{JSON.stringify(chats, null, 2)}</pre>
    </>
  )
}

export const getServerSideProps =
  generateAuthGetServerSideProps<IndexPageProps>(
    async (store, _context, authUserId) => {
      store.dispatch(getUser.initiate(authUserId))
      store.dispatch(getChats.initiate(authUserId))
      return { userId: authUserId }
    },
  )

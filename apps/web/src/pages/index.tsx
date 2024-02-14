import { getUser, getChats } from '@ddp-bot/api'
import { Layout } from 'containers/Layout'
import { generateAuthGetServerSideProps } from 'utils/auth-server-props'

interface IndexPageProps {
  userId: string
}

export default function IndexPage(props: IndexPageProps) {
  return (
    <Layout userId={props.userId}>
      <pre></pre>
    </Layout>
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

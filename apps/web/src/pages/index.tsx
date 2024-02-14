import { getUser, getChats } from '@ddp-bot/api'
import { Layout } from 'containers/layout'
import { generateAuthGetServerSideProps } from 'utils/server-props'

interface IndexPageProps {
  userId: string
}

export default function IndexPage(props: IndexPageProps) {
  return (
    <Layout userId={props.userId}>
      <div
        className={'flex items-center justify-center h-full p-4 text-slate-500'}
      >
        Either select a chat or create a new one from the menu.
      </div>
    </Layout>
  )
}

export const getServerSideProps =
  generateAuthGetServerSideProps<IndexPageProps>(
    async (store, _context, authUserId) => {
      store.dispatch(getUser.initiate(authUserId))
      store.dispatch(getChats.initiate(authUserId))

      return { props: { userId: authUserId } }
    },
  )

import { getChat, getConversations, useGetChatQuery } from '@ddp-bot/api'
import { ChatWindow } from 'containers/chat'
import { Layout } from 'containers/layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { generateAuthGetServerSideProps } from 'utils/server-props'

interface IndexPageProps {
  userId: string
  chatId: string
}

export default function ChatPage(props: IndexPageProps) {
  const router = useRouter()
  const { isError } = useGetChatQuery(props.chatId)
  useEffect(() => {
    if (isError) {
      router.push('/')
    }
  }, [isError, router])

  return (
    <Layout userId={props.userId}>
      <ChatWindow chatId={props.chatId} />
    </Layout>
  )
}

export const getServerSideProps =
  generateAuthGetServerSideProps<IndexPageProps>(
    async (store, context, authUserId) => {
      const chatId = context.params?.chatId?.toString()!
      const result = await store.dispatch(getChat.initiate(chatId))
      if (result.isError) {
        return { redirect: { destination: '/', statusCode: 302 } } as const
      }
      store.dispatch(getConversations.initiate({ chatId }))

      return { props: { userId: authUserId, chatId } }
    },
  )

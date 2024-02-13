import { NextPage } from 'next'
import React from 'react'
import { Text, PageLayout } from '@ddp-bot/web-ui'
import {
  useGetChatsQuery,
  getDatabaseQueriesThunk,
  getUser,
} from '@ddp-bot/api'
import { wrapper } from '@ddp-bot/store'

const IndexPage: NextPage<{ id: string }> = (props) => {
  const { data: chats } = useGetChatsQuery(props.id)

  return (
    <PageLayout>
      <Text type="h1" bottomMargin={'large'}>
        DDP Chatbot
      </Text>
      <a href={'/api/logout'}>Logout</a>
      <pre>{JSON.stringify(chats, null, 2)}</pre>
    </PageLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const authUserId = context.req.cookies['ddp-user']
    if (!authUserId) {
      return {
        redirect: { destination: '/login', statusCode: 301 },
      }
    }

    store.dispatch(getUser.initiate(authUserId))

    await Promise.all(store.dispatch(getDatabaseQueriesThunk()))
    return {
      props: {
        id: authUserId,
      },
    }
  },
)

export default IndexPage

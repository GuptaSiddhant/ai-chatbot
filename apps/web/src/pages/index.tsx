import { NextPage } from 'next'
import React from 'react'
import { Text, PageLayout } from '@ddp-bot/web-ui'
import {
  useGetUsersQuery,
  getUsers,
  getDatabaseQueriesThunk,
} from '@ddp-bot/api'
import { wrapper } from '@ddp-bot/store'

const IndexPage: NextPage = () => {
  //get data from API
  const { data: users } = useGetUsersQuery()
  console.log(users)

  return (
    <PageLayout>
      <Text type="h1" bottomMargin={'large'}>
        DDP Chatbot
      </Text>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </PageLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id
    store.dispatch(getUsers.initiate())

    await Promise.all(store.dispatch(getDatabaseQueriesThunk()))
    return {
      props: {},
    }
  },
)

export default IndexPage

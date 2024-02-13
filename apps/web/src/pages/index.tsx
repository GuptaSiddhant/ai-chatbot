import { NextPage } from 'next'
import React from 'react'
import { Text, PageLayout } from '@ddp-bot/web-ui'
import { useAppSelector, selectExampleValue } from '@ddp-bot/store'
import { useGetTodosQuery } from '@ddp-bot/api'

// import needed for static generation on server
import { getTodos, getTodoQueriesThunk } from '@ddp-bot/api'
import { wrapper } from '@ddp-bot/store'

const IndexPage: NextPage = () => {
  //get a value from global state
  const exampleValue = useAppSelector(selectExampleValue)

  //get data from API
  const { data: todos } = useGetTodosQuery()

  return (
    <PageLayout>
      <Text type="h1" bottomMargin={'large'}>
        DDP Chatbot
      </Text>

      <Text
        type={'subtitle1'}
        bottomMargin="small"
        text="It has packages for RTK State manager, typescript definitions, API Query caching, Mocking of data"
      />
      <Text type={'subtitle2'} text={`Current state value: ${exampleValue}`} />
      <Text>
        <>
          <br />
          Some data coming from API or mocked API:
          {todos &&
            todos
              .slice(0, 3)
              .map((todo) => <li key={todo.id}>{todo.title}</li>)}
        </>
      </Text>
    </PageLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id
    if (typeof id === 'string') {
      store.dispatch(getTodos.initiate())
    }
    await Promise.all(store.dispatch(getTodoQueriesThunk()))
    return {
      props: {},
    }
  },
)

export default IndexPage

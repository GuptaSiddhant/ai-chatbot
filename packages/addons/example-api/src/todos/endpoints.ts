import { exampleApiSlice } from '../exampleApiSlice'
import { todosTransformer } from './utils'
import { ITodo } from '@ddp-bot/types'

export const exampleApiTodosSlice = exampleApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], void>({
      query: () => ({
        url: 'todos',
        responseHandler: todosTransformer,
      }),
    }),
  }),
})

// Export thunks for usage in SSR
export const { getRunningQueriesThunk: getTodoQueriesThunk } =
  exampleApiTodosSlice.util

export const { useGetTodosQuery } = exampleApiTodosSlice

// export endpoints for use in SSR
export const { getTodos } = exampleApiTodosSlice.endpoints

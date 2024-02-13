import { databaseApiSlice } from '../databaseApiSlice'
import type { IConversation } from '@ddp-bot/types'
import type { ICreateConversationPayload } from './types'
import { transformCreateConversationPayloadToRequestBody } from './utils'

const endpoint = 'conversations'

export const databaseApiConversationsSlice = databaseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<IConversation[], void>({
      query: () => ({ url: endpoint, responseHandler: 'json' }),
    }),
    getConversation: builder.query<IConversation, string>({
      query: (id) => ({ url: `${endpoint}/${id}`, responseHandler: 'json' }),
    }),
    createConversation: builder.mutation<
      IConversation,
      ICreateConversationPayload
    >({
      query: (payload) => ({
        url: endpoint,
        method: 'POST',
        body: transformCreateConversationPayloadToRequestBody(payload),
        responseHandler: 'json',
      }),
    }),
  }),
})

// Export thunks for usage in SSR
export const { getRunningQueriesThunk: getConversationQueriesThunk } =
  databaseApiConversationsSlice.util

export const {
  useCreateConversationMutation,
  useGetConversationQuery,
  useGetConversationsQuery,
} = databaseApiConversationsSlice

// export endpoints for use in SSR
export const { createConversation, getConversation, getConversations } =
  databaseApiConversationsSlice.endpoints

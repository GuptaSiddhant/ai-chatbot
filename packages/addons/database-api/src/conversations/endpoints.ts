import { databaseApiSlice } from '../databaseApiSlice'
import type { IConversation } from '@ddp-bot/types'
import type { ICreateConversationPayload } from './types'
import { transformCreateConversationPayloadToRequestBody } from './utils'

const endpoint = 'conversations'

export const databaseApiConversationsSlice = databaseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<IConversation[], void>({
      providesTags: [{ type: 'Conversation', id: 'LIST' }],
      query: () => ({ url: endpoint, responseHandler: 'json' }),
    }),
    getConversation: builder.query<IConversation, string>({
      providesTags: (result, error, id) => [{ type: 'Conversation', id }],
      query: (id) => ({ url: `${endpoint}/${id}`, responseHandler: 'json' }),
    }),
    createConversation: builder.mutation<
      IConversation,
      ICreateConversationPayload
    >({
      invalidatesTags: [{ type: 'Conversation', id: 'LIST' }],
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

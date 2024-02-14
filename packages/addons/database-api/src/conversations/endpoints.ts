import { databaseApiSlice } from '../databaseApiSlice'
import type { IConversation } from '@ddp-bot/types'
import type { ICreateConversationPayload } from './types'
import { transformCreateConversationPayloadToRequestBody } from './utils'

const endpoint = 'conversations'

export const databaseApiConversationsSlice = databaseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<IConversation[], { chatId: string }>({
      providesTags: (result, error, { chatId }) => [
        { type: 'Conversation', id: chatId },
      ],
      query: ({ chatId }) => ({
        url: `${endpoint}?chatId=${chatId}`,
        responseHandler: 'json',
      }),
    }),
    createConversation: builder.mutation<
      IConversation,
      ICreateConversationPayload
    >({
      invalidatesTags: (result, error, { chatId }) => [
        { type: 'Conversation', id: chatId },
      ],
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

export const { useCreateConversationMutation, useGetConversationsQuery } =
  databaseApiConversationsSlice

// export endpoints for use in SSR
export const { createConversation, getConversations } =
  databaseApiConversationsSlice.endpoints

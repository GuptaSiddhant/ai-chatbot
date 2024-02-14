import { databaseApiSlice } from '../databaseApiSlice'
import type { IChat } from '@ddp-bot/types'
import type { ICreateChatPayload } from './types'
import { transformCreateChatPayloadToRequestBody } from './utils'

const endpoint = 'chats'

export const databaseApiChatsSlice = databaseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<IChat[], string>({
      providesTags: (result, error, userId) => [{ type: 'Chat', id: userId }],
      query: (userId) => ({
        url: `${endpoint}?userId=${userId}`,
        responseHandler: 'json',
      }),
    }),
    getChat: builder.query<IChat, string>({
      providesTags: (result, error, id) => [{ type: 'Chat', id }],
      query: (id) => ({ url: `${endpoint}/${id}`, responseHandler: 'json' }),
    }),
    createChat: builder.mutation<IChat, ICreateChatPayload>({
      invalidatesTags: ['Chat'],
      query: (payload) => ({
        url: endpoint,
        method: 'POST',
        body: transformCreateChatPayloadToRequestBody(payload),
        responseHandler: 'json',
      }),
    }),
    deleteChat: builder.mutation<void, string>({
      invalidatesTags: (result, error, id) => ['Chat', { type: 'Chat', id }],
      query: (id) => ({ url: `${endpoint}/${id}`, method: 'DELETE' }),
    }),
  }),
})

// Export thunks for usage in SSR
export const { getRunningQueriesThunk: getChatQueriesThunk } =
  databaseApiChatsSlice.util

export const {
  useCreateChatMutation,
  useGetChatQuery,
  useGetChatsQuery,
  useDeleteChatMutation,
} = databaseApiChatsSlice

// export endpoints for use in SSR
export const { createChat, getChat, getChats } = databaseApiChatsSlice.endpoints

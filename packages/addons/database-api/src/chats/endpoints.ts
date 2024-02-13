import { databaseApiSlice } from '../databaseApiSlice'
import type { IChat } from '@ddp-bot/types'
import type { ICreateChatPayload } from './types'
import { transformCreateChatPayloadToRequestBody } from './utils'

const endpoint = 'chats'

export const databaseApiChatsSlice = databaseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<IChat[], string>({
      query: (userId) => ({
        url: `${endpoint}?userId=${userId}`,
        responseHandler: 'json',
      }),
    }),
    getChat: builder.query<IChat, string>({
      query: (id) => ({ url: `${endpoint}/${id}`, responseHandler: 'json' }),
    }),
    createChat: builder.mutation<IChat, ICreateChatPayload>({
      query: (payload) => ({
        url: endpoint,
        method: 'POST',
        body: transformCreateChatPayloadToRequestBody(payload),
        responseHandler: 'json',
      }),
    }),
  }),
})

// Export thunks for usage in SSR
export const { getRunningQueriesThunk: getChatQueriesThunk } =
  databaseApiChatsSlice.util

export const { useCreateChatMutation, useGetChatQuery, useGetChatsQuery } =
  databaseApiChatsSlice

// export endpoints for use in SSR
export const { createChat, getChat, getChats } = databaseApiChatsSlice.endpoints

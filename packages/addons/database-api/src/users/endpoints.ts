import { databaseApiSlice } from '../databaseApiSlice'
import type { IUser } from '@ddp-bot/types'
import type { ICreateUserPayload } from './types'
import { transformCreateUserPayloadToRequestBody } from './utils'

const endpoint = 'users'

export const databaseApiUsersSlice = databaseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      providesTags: [{ type: 'User', id: 'LIST' }],
      query: () => ({ url: endpoint, responseHandler: 'json' }),
    }),
    getUser: builder.query<IUser, string>({
      providesTags: (result, error, id) => [{ type: 'User', id }],
      query: (id) => ({ url: `${endpoint}/${id}`, responseHandler: 'json' }),
    }),
    createUser: builder.mutation<IUser, ICreateUserPayload>({
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
      query: (payload) => ({
        url: endpoint,
        method: 'POST',
        body: transformCreateUserPayloadToRequestBody(payload),
        responseHandler: 'json',
      }),
    }),
  }),
})

export const { useGetUsersQuery, useGetUserQuery, useCreateUserMutation } =
  databaseApiUsersSlice

// export endpoints for use in SSR
export const { getUsers, getUser, createUser } = databaseApiUsersSlice.endpoints

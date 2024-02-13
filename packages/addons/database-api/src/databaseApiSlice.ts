// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export const databaseUrl = 'http://localhost:4000/'

// Define our single API slice object
export const databaseApiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'databaseApi',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: databaseUrl,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  // The "endpoints" represent operations and requests for this server
  endpoints: () => ({
    // the end points are inject from respective slice
  }),
})

export const { getRunningQueriesThunk: getDatabaseQueriesThunk } =
  databaseApiSlice.util

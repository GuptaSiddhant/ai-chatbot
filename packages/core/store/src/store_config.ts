import { exampleApiSlice } from '@ddp-bot/example-api'
import exampleSlice from './example/exampleSlice'

/**
 * Add all reducers here
 */
export const reducers = {
  example: exampleSlice.reducer,

  //-----------------------------------------------------------
  // Add all api slices
  //-----------------------------------------------------------
  [exampleApiSlice.reducerPath]: exampleApiSlice.reducer,
}

//-----------------------------------------------------------
// add all api middlewares here
//-----------------------------------------------------------
export const extra_midlewares = [exampleApiSlice.middleware]

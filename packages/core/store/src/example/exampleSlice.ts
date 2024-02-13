import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '../../src'
import { TExampleValue } from '@ddp-bot/types'

export type ExampleSliceState = { exampleValue: TExampleValue }

export const initialState: ExampleSliceState = {
  exampleValue: 2,
}

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setExampleValue: (
      state,
      { payload: newValue }: PayloadAction<TExampleValue>,
    ) => {
      state.exampleValue = newValue
    },
  },
})

export const selectExampleValue = (state: AppState): TExampleValue =>
  state.example.exampleValue

export const exampleActions = exampleSlice.actions

export const exampleReducer = exampleSlice.reducer

export default exampleSlice

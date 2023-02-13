import { createReducer } from '@reduxjs/toolkit'

import { setStep } from './actions'

export type loginState = {
  step: number
}

const initialState: loginState = {
  step: 0,
}

export const loginReducer = createReducer(initialState, (builder) => {
  builder.addCase(setStep, (state, action) => {
    state.step = action.payload
  })
})

import { createReducer } from '@reduxjs/toolkit'

import {
  addBatch,
  removeBatch,
  addBatchId,
  addExcelData,
  addKey,
  removeKey,
} from './actions'

export type CsvState = {
  firstName: string
  lastName: string
  email: string
  firstAllowedEntryDate: Date
  lastAllowedEntryDate: Date
}

export type BatchState = {
  inputParams: CsvState[]
  batchId: number
  eventName: string
  contractAddress: string
  addBatchTimestamp: number
  key: string
}

const initialState: BatchState = {
  inputParams: [],
  batchId: 0,
  eventName: '',
  contractAddress: '',
  addBatchTimestamp: 0,
  key: '',
}

export const batchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addBatch, (state, action) => {
      const updateState: BatchState = action.payload
      const newState = { ...state, ...updateState }
      state = newState
      return state
    })
    .addCase(removeBatch, (state) => {
      state.eventName = ''
      state.addBatchTimestamp = 0
      state.batchId = 0
      state.contractAddress = ''
      state.inputParams = []
      return state
    })
    .addCase(addBatchId, (state, action) => {
      state.batchId = action.payload
      return state
    })
    .addCase(addExcelData, (state, action) => {
      state.inputParams = action.payload
      return state
    })
    .addCase(addKey, (state, action) => {
      state.key = action.payload
      return state
    })
    .addCase(removeKey, (state) => {
      state.key = ''
      return state
    })
})

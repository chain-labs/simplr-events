import { createAction } from '@reduxjs/toolkit'
import { ProviderProps, SignerProps } from 'src/ethereum/types'
import { BatchState, CsvState } from './reducers'

export const addBatch = createAction<BatchState>('batch/ADD_BATCH')

export const addExcelData = createAction<CsvState[]>('batch/ADD_EXCEL_DATA')

export const removeBatch = createAction('batch/REMOVE_BATCH')

export const addBatchId = createAction<number>('batch/ADD_BATCH_ID')

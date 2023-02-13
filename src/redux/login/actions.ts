import { createAction } from '@reduxjs/toolkit'
import { ProviderProps, SignerProps } from 'src/ethereum/types'

export const setStep = createAction<number>('login/SET_STEP')

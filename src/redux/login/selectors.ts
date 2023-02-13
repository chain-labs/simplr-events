import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '../store'

export const selectLogin = (state: AppState) => state.login

export const loginSelector = createSelector(selectLogin, (state) => state)

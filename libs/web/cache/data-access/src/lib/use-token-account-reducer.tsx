import { DAS } from 'helius-sdk'
import { useReducer } from 'react'

export interface TokenAccountFilter {
  addresses: string[]
  owners: string[]
  amountMin: number
  amountMax: number
}

const initialState: TokenAccountFilter = {
  addresses: [],
  owners: [],
  amountMin: 0,
  amountMax: 0,
}

export type TokenAccountUpdateFilterAction = {
  [K in keyof TokenAccountFilter]: {
    type: 'UPDATE_FILTER'
    field: K
    value: TokenAccountFilter[K]
  }
}[keyof TokenAccountFilter]

export type TokenAccountFilterAction = TokenAccountUpdateFilterAction | { type: 'RESET' }

export function tokenAccountFilterReducer(
  state: TokenAccountFilter,
  action: TokenAccountFilterAction,
): TokenAccountFilter {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return { ...state, [action.field]: action.value }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function useTokenAccountReducer() {
  return useReducer(tokenAccountFilterReducer, initialState)
}

export function filterTokenAccounts(data: DAS.TokenAccounts[], state: TokenAccountFilter): DAS.TokenAccounts[] {
  return data.filter((item) => {
    const addressCondition = state.addresses.length === 0 || state.addresses.includes(item.address ?? '')
    const ownerCondition = state.owners.length === 0 || state.owners.includes(item.owner ?? '')
    const amountMinCondition = state.amountMin === 0 || (item.amount ?? 0) >= state.amountMin
    const amountMaxCondition = state.amountMax === 0 || (item.amount ?? 0) <= state.amountMax
    return addressCondition && ownerCondition && amountMinCondition && amountMaxCondition
  })
}

export function sortTokenAccounts(data: DAS.TokenAccounts[], order: 'asc' | 'desc' = 'asc'): DAS.TokenAccounts[] {
  const multiplier = order === 'asc' ? 1 : -1

  return [...data].sort((a, b) => ((a.amount ?? 0) - (b.amount ?? 0)) * multiplier)
}

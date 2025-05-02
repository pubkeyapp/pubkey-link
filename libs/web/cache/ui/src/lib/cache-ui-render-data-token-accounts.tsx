import { useAdminCacheDetail, useTokenAccountReducer } from '@pubkey-link/web-cache-data-access'
import { UiDebug, UiStack } from '@pubkey-ui/core'
import React from 'react'
import { CacheUiTokenAccountFilterForm } from './cache-ui-token-account-filter-form'
import { CacheUiTokenAccountTable } from './cache-ui-token-account-table'

export function CacheUiRenderDataTokenAccounts({ data }: { data: ReturnType<typeof useAdminCacheDetail>['data'] }) {
  const [state, dispatch] = useTokenAccountReducer()

  return (
    <UiStack>
      <CacheUiTokenAccountFilterForm dispatch={dispatch} state={state} />
      <UiDebug data={{ state, ...data, items: undefined }} />
      <CacheUiTokenAccountTable items={data.items} state={state} />
    </UiStack>
  )
}

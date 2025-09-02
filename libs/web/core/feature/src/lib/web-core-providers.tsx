import { AuthProvider } from '@pubkey-link/web-auth-data-access'
import { AppConfigProvider, SdkProvider } from '@pubkey-link/web-core-data-access'
import { toastError } from '@pubkey-ui/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: () => {
        toastError(`Something went wrong`)
      },
    },
  },
})

export function WebCoreProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <NuqsAdapter>
        <QueryClientProvider client={client}>
          <SdkProvider>
            <AppConfigProvider>
              <AuthProvider>{children}</AuthProvider>
            </AppConfigProvider>
          </SdkProvider>
        </QueryClientProvider>
      </NuqsAdapter>
    </BrowserRouter>
  )
}

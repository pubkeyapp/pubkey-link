import { AuthProvider } from '@pubkey-link/web-auth-data-access'
import { AppConfigProvider, SdkProvider } from '@pubkey-link/web-core-data-access'
import { SolanaClusterProvider } from '@pubkey-link/web-solana-data-access'
import { toastError, UiThemeLink, UiThemeProvider } from '@pubkey-ui/core'
import '@pubkey-ui/core/index.esm.css'
import 'mantine-datatable/styles.layer.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Link } from 'react-router-dom'
import { ShellRoutes } from './shell.routes'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: () => {
        toastError(`Something went wrong`)
      },
    },
  },
})

// eslint-disable-next-line func-style
export const ThemeLink: UiThemeLink = ({ children, ...props }) => <Link {...props}>{children}</Link>

export function ShellFeature() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <SdkProvider>
          <AppConfigProvider>
            <AuthProvider>
              <UiThemeProvider link={ThemeLink}>
                <SolanaClusterProvider>
                  <ShellRoutes />
                </SolanaClusterProvider>
              </UiThemeProvider>
            </AuthProvider>
          </AppConfigProvider>
        </SdkProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

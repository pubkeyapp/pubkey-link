import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { SolanaClusterProvider } from '@pubkey-link/web-solana-data-access'
import { UiThemeLink, UiThemeProvider } from '@pubkey-ui/core'
import '@pubkey-ui/core/index.esm.css'
import 'mantine-datatable/styles.layer.css'
import { Link } from 'react-router-dom'
import { WebCoreProviders } from './web-core-providers'
import { WebCoreRoutes } from './web-core-routes'

// eslint-disable-next-line func-style
export const ThemeLink: UiThemeLink = ({ children, ...props }) => <Link {...props}>{children}</Link>

export function WebCoreFeature() {
  return (
    <WebCoreProviders>
      <Feature />
    </WebCoreProviders>
  )
}

function Feature() {
  const { appTheme } = useAppConfig()

  return (
    <UiThemeProvider link={ThemeLink} theme={appTheme}>
      <SolanaClusterProvider>
        <WebCoreRoutes />
      </SolanaClusterProvider>
    </UiThemeProvider>
  )
}

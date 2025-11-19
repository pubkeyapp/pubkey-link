import {
  ColorSchemeScript,
  createTheme,
  DEFAULT_THEME,
  Loader,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { createContext, FunctionComponent, ReactNode, Suspense, useContext } from 'react'
import { UiColorSchemeProvider } from './app-ui-color-scheme-provider'

// Import the mantine theme styles
import './app-ui-theme-styles'

const defaultTheme = createTheme({
  colors: {
    brand: DEFAULT_THEME.colors.blue,
  },
  primaryColor: 'brand',
})

export type UiThemeLink = FunctionComponent<{
  children: ReactNode
  to: string
  target?: HTMLAnchorElement['target']
  rel?: HTMLAnchorElement['rel']
}>

export const defaultUiThemeLink: UiThemeLink = ({ children, ...props }) => (
  <a href={props.to} {...props}>
    {children}
  </a>
)

export interface UiThemeProviderOptions {
  children: ReactNode
  link?: UiThemeLink
  theme?: MantineThemeOverride
}
export interface UiThemeProviderContext {
  Link: UiThemeLink
}

const Context = createContext<UiThemeProviderContext>({} as UiThemeProviderContext)

export function UiThemeProvider({ children, link, theme }: UiThemeProviderOptions) {
  const value: UiThemeProviderContext = {
    Link: link ?? defaultUiThemeLink,
  }

  return (
    <Context.Provider value={value}>
      <ColorSchemeScript defaultColorScheme="dark" />
      <MantineProvider theme={theme ?? defaultTheme} defaultColorScheme="dark">
        <UiColorSchemeProvider>
          <ModalsProvider>
            <Notifications />
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </ModalsProvider>
        </UiColorSchemeProvider>
      </MantineProvider>
    </Context.Provider>
  )
}

export function useUiTheme() {
  return useContext(Context)
}

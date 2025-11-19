import { MantineColorScheme, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { createContext, ReactNode, useContext } from 'react'

export interface UiColorSchemeProviderContext {
  colorScheme: MantineColorScheme
  toggleColorScheme: (colorScheme?: MantineColorScheme) => void
}

const Context = createContext<UiColorSchemeProviderContext>({} as UiColorSchemeProviderContext)

export function UiColorSchemeProvider({ children }: { children: ReactNode }) {
  const { toggleColorScheme } = useMantineColorScheme()
  const colorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true })

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  const value: UiColorSchemeProviderContext = {
    colorScheme,
    toggleColorScheme,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useUiColorScheme() {
  return useContext(Context)
}

import { Program, ProgramAccount } from '@coral-xyz/anchor'
import { Counter } from '@pubkey-link/anchor'
import { createContext, ReactNode, useContext } from 'react'
import { useCounterProgram } from './use-counter-program'
import { useCluster } from '@pubkey-link/web-solana-data-access'
import { useCounterFetch } from './use-counter-fetch'
import { useCounterRefresh } from './use-counter-refresh'

export interface CounterProgramAccountProviderContext {
  account: ProgramAccount<{ count: number }>
  program: Program<Counter>
  refresh: () => Promise<void>
  getExplorerUrl: (path: string) => string
}

const Context = createContext<CounterProgramAccountProviderContext>({} as CounterProgramAccountProviderContext)

export function CounterProgramAccountProvider({
  account,
  children,
}: {
  account: ProgramAccount<{ count: number }>
  children: ReactNode
}) {
  const program = useCounterProgram()
  const { getExplorerUrl } = useCluster()
  const counterRefresh = useCounterRefresh()
  const counterQuery = useCounterFetch({ account: account.publicKey })

  return (
    <Context.Provider
      value={{
        account,
        program,
        refresh: async () => {
          await Promise.all([counterQuery.refetch(), counterRefresh()])
        },
        getExplorerUrl,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useCounterProgramAccount() {
  return useContext(Context)
}

import { toastError } from '@pubkey-ui/core'
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Connection, LAMPORTS_PER_SOL, PublicKey, TransactionSignature } from '@solana/web3.js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCluster } from './cluster-provider'
import { createTransaction } from './create-transaction'
import { uiToastLink } from './ui-toast-link'

export function useQueries({ address }: { address: PublicKey }) {
  const { connection } = useConnection()
  const wallet = useWallet()

  return {
    getBalance: {
      queryKey: ['getBalance', { endpoint: connection?.rpcEndpoint, address }],
      queryFn: () => connection.getBalance(address),
    },
    getSignatures: {
      queryKey: ['getSignatures', { endpoint: connection?.rpcEndpoint, address }],
      queryFn: () => connection.getConfirmedSignaturesForAddress2(address),
    },
    getTokenAccounts: {
      queryKey: ['getTokenAccounts', { endpoint: connection?.rpcEndpoint, address }],
      queryFn: () => getAllTokenAccounts(connection, address),
    },
    getTokenBalance: {
      queryKey: ['getTokenBalance', { endpoint: connection?.rpcEndpoint, account: address }],
      queryFn: () => connection.getTokenAccountBalance(address),
    },
    requestAirdrop: {
      mutationKey: ['requestAirdrop', { endpoint: connection?.rpcEndpoint, address }],
      mutationFn: (amount: string) => requestAndConfirmAirdrop({ address, amount, connection }),
    },
    transferSol: {
      mutationKey: ['transferSol', { endpoint: connection?.rpcEndpoint, address }],
      mutationFn: async ({ amount, destination }: { amount: string; destination: PublicKey }) => {
        try {
          const { transaction, latestBlockhash } = await createTransaction({
            amount,
            connection,
            destination,
            publicKey: address,
          })

          // Send transaction and await for signature
          const signature: TransactionSignature = await wallet.sendTransaction(transaction, connection)

          // Send transaction and await for signature
          await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')

          return signature
        } catch (error: unknown) {
          console.log('error', `Transaction failed! ${error}`)
          return
        }
      },
    },
  }
}

export function useGetBalance({ address }: { address: PublicKey }) {
  return useQuery(useQueries({ address }).getBalance)
}
export function useGetSignatures({ address }: { address: PublicKey }) {
  return useQuery(useQueries({ address }).getSignatures)
}
export function useGetTokenAccounts({ address }: { address: PublicKey }) {
  return useQuery(useQueries({ address }).getTokenAccounts)
}
export function useGetTokenBalance({ address }: { address: PublicKey }) {
  return useQuery(useQueries({ address }).getTokenBalance)
}
export function useRequestAirdrop({ address }: { address: PublicKey }) {
  const {
    requestAirdrop: { mutationKey, mutationFn },
  } = useQueries({ address })
  const onSuccess = useOnTransactionSuccess({ address })
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess,
    onError: (error: unknown) => {
      toastError(`Requesting airdrop failed! ${error}`)
    },
  })
}
export function useTransferSol({ address }: { address: PublicKey }) {
  const onSuccess = useOnTransactionSuccess({ address })
  return useMutation({
    ...useQueries({ address }).transferSol,
    onSuccess,
    onError: (error: unknown) => {
      toastError(`Requesting airdrop failed! ${error}`)
    },
  })
}

async function getAllTokenAccounts(connection: Connection, address: PublicKey) {
  const [tokenAccounts, token2022Accounts] = await Promise.all([
    connection.getParsedTokenAccountsByOwner(address, { programId: TOKEN_PROGRAM_ID }),
    connection.getParsedTokenAccountsByOwner(address, { programId: TOKEN_2022_PROGRAM_ID }),
  ])
  return [...tokenAccounts.value, ...token2022Accounts.value]
}

async function requestAndConfirmAirdrop({
  address,
  amount,
  connection,
}: {
  connection: Connection
  address: PublicKey
  amount: string
}) {
  const [latestBlockhash, signature] = await Promise.all([
    connection.getLatestBlockhash(),
    connection.requestAirdrop(address, parseFloat(amount) * LAMPORTS_PER_SOL),
  ])

  await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')
  return signature
}

function useOnTransactionSuccess({ address }: { address: PublicKey }) {
  const { getExplorerUrl } = useCluster()
  const client = useQueryClient()
  const { getBalance, getSignatures } = useQueries({ address })

  return (signature?: TransactionSignature) => {
    if (signature) {
      uiToastLink({ link: getExplorerUrl(`tx/${signature}`), label: 'View Transaction' })
    }
    return Promise.all([
      client.invalidateQueries({ queryKey: getBalance.queryKey }),
      client.invalidateQueries({ queryKey: getSignatures.queryKey }),
    ])
  }
}

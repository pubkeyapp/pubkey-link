import { PublicKey, VersionedTransaction } from '@solana/web3.js'
import { encode } from 'bs58'
import { createLedgerTransaction } from './create-ledger-transaction'

export interface CreateSignature {
  challenge: string
  blockhash?: string
  publicKey: PublicKey | string
  signMessage?: (message: Uint8Array) => Promise<Uint8Array>
  signTransaction?: (transaction: VersionedTransaction) => Promise<VersionedTransaction>
  useLedger: boolean
}

export interface SignedChallenge {
  message: string
  signature: string
}

export async function createSignature({
  challenge,
  blockhash,
  publicKey,
  signMessage,
  useLedger,
  signTransaction,
}: CreateSignature): Promise<SignedChallenge> {
  if (useLedger) {
    if (!signTransaction) {
      return Promise.reject('No sign transaction')
    }
    if (!blockhash) {
      return Promise.reject('No blockhash')
    }

    const tx = createLedgerTransaction({ blockhash, challenge, publicKey })

    const signedTx = await signTransaction(tx)
    const signatureBytes = signedTx.signatures[0]

    return {
      message: encode(signedTx.message.serialize()),
      signature: encode(signatureBytes),
    }
  }

  if (!signMessage) {
    return Promise.reject('No sign message')
  }

  const message = new TextEncoder().encode(challenge)
  const signature = await signMessage(message)

  return { message: encode(message), signature: encode(signature) }
}

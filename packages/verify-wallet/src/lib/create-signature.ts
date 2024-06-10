import { PublicKey, VersionedTransaction } from '@solana/web3.js'
import { createSignatureLedger } from './create-signature-ledger'
import { createSignatureWallet } from './create-signature-wallet'
import { SignedChallenge } from './signed-challenge'

export interface CreateSignature {
  challenge: string
  blockhash?: string
  publicKey: PublicKey | string
  signMessage?: (message: Uint8Array) => Promise<Uint8Array>
  signTransaction?: (transaction: VersionedTransaction) => Promise<VersionedTransaction>
  useLedger: boolean
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

    return createSignatureLedger({ challenge, blockhash, publicKey, signTransaction })
  }

  if (!signMessage) {
    return Promise.reject('No sign message')
  }
  return createSignatureWallet({ challenge, signMessage })
}

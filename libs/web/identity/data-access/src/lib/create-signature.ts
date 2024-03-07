import { PublicKey, Transaction, TransactionInstruction, VersionedTransaction } from '@solana/web3.js'
import * as bs58 from 'bs58'
import { sign } from 'tweetnacl'
import { MEMO_PROGRAM_ID } from './constants'

export interface CreateSignature {
  challenge: string
  blockhash?: string
  publicKey: string
  signMessage?: (message: Uint8Array) => Promise<Uint8Array>
  signTransaction?: (transaction: Transaction | VersionedTransaction) => Promise<Transaction | VersionedTransaction>
  useLedger: boolean
}

export interface CreateSignatureLedger {
  blockhash: string
  challenge: string
  publicKey: string
  signTransaction: (transaction: Transaction | VersionedTransaction) => Promise<Transaction | VersionedTransaction>
}

export interface CreateSignatureWallet {
  challenge: string
  publicKey: string
  signMessage: (message: Uint8Array) => Promise<Uint8Array>
}

async function createSignatureLedger({
  blockhash,
  challenge,
  publicKey,
  signTransaction,
}: CreateSignatureLedger): Promise<string> {
  const tx = new Transaction()
  tx.add(new TransactionInstruction({ data: Buffer.from(challenge, 'utf8'), keys: [], programId: MEMO_PROGRAM_ID }))
  tx.feePayer = new PublicKey(publicKey)
  tx.recentBlockhash = blockhash

  const signedTx = await signTransaction(tx)
  if (!signedTx) throw new Error('No signedTx')
  return signedTx.serialize().toString('hex')
}

async function createSignatureWallet({ publicKey, signMessage, challenge }: CreateSignatureWallet): Promise<string> {
  // Sign the message
  const message = new TextEncoder().encode(challenge)
  const signature = await signMessage(message)

  if (!sign.detached.verify(message, signature, new PublicKey(publicKey).toBytes()))
    throw new Error('Invalid signature!')
  return bs58.encode(signature)
}

export async function createSignature({
  challenge,
  blockhash,
  publicKey,
  signMessage,
  useLedger,
  signTransaction,
}: CreateSignature) {
  if (useLedger) {
    if (!signTransaction) {
      return Promise.reject('No sign transaction')
    }
    if (!blockhash) {
      return Promise.reject('No blockhash')
    }
    return createSignatureLedger({ challenge, publicKey, blockhash, signTransaction })
  } else {
    if (!signMessage) {
      return Promise.reject('No sign message')
    }
    return createSignatureWallet({ challenge, publicKey, signMessage })
  }
}

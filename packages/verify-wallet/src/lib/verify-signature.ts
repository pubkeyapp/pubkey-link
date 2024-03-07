import { PublicKey, Transaction } from '@solana/web3.js'
import * as bs58 from 'bs58'
import { sign } from 'tweetnacl'
import { MEMO_PROGRAM_ID } from './constants'

export interface VerifySignature {
  challenge: string
  publicKey: string
  signature: string
  useLedger: boolean
}

export type VerifySignatureLedger = Omit<VerifySignature, 'publicKey' | 'useLedger'>
export type VerifySignatureWallet = Omit<VerifySignature, 'useLedger'>

function fromHexString(hexString: string) {
  return Uint8Array.from(hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)))
}

function validateAuthTx(tx: Transaction, nonce: string): boolean {
  try {
    const inx = tx.instructions[0]
    if (!inx.programId.equals(MEMO_PROGRAM_ID)) return false
    if (inx.data.toString() !== nonce) return false
    if (!tx.verifySignatures()) return false
  } catch (e) {
    return false
  }
  return true
}

function verifySignatureLedger({ challenge, signature }: VerifySignatureLedger) {
  // Signature to Uint8Array
  const uint8 = fromHexString(signature)

  // Deserialize transactions
  const tx = Transaction.from(uint8)

  // Validate
  const valid = validateAuthTx(tx, challenge)
  if (!valid) {
    throw Error('Signature verification failed')
  }
  return true
}

function verifySignatureWallet({ challenge, publicKey, signature }: VerifySignatureWallet) {
  if (
    sign.detached.verify(
      new TextEncoder().encode(challenge),
      bs58.decode(signature),
      new PublicKey(publicKey).toBytes(),
    )
  ) {
    return true
  }
  throw Error('Signature verification failed')
}

export function verifySignature({ challenge, publicKey, signature, useLedger }: VerifySignature) {
  return useLedger
    ? verifySignatureLedger({ signature, challenge })
    : verifySignatureWallet({ publicKey, signature, challenge })
}

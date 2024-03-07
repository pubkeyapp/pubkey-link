import { PublicKey } from '@solana/web3.js'
import { decode } from 'bs58'
import { sign } from 'tweetnacl'

export function verifyMessageSignature({
  message,
  signature,
  publicKey,
}: {
  message: string
  signature: string
  publicKey: PublicKey | string
}) {
  return sign.detached.verify(decode(message), decode(signature), new PublicKey(publicKey).toBytes())
}

import { PublicKey } from '@solana/web3.js'
import { bs58Decode, ed25519Verify } from './helpers'

interface VerifySignatureOptions {
  message: string
  signature: string
  publicKey: PublicKey | string
}

export function verifySignature({ message, signature, publicKey }: VerifySignatureOptions) {
  return ed25519Verify({
    message: bs58Decode(message),
    signature: bs58Decode(signature),
    publicKey: new PublicKey(publicKey).toBytes(),
  })
}

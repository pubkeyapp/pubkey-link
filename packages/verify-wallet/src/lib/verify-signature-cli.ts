import { bs58Decode, constructSolanaMessage, ed25519Verify } from './helpers'

export interface VerifySignatureCliOptions {
  challenge: string
  signature: string
  publicKey: string
}

export function verifySignatureCli({ challenge, signature, publicKey }: VerifySignatureCliOptions) {
  return ed25519Verify({
    signature: bs58Decode(signature),
    message: constructSolanaMessage(challenge),
    publicKey: bs58Decode(publicKey),
  })
}

import * as bs58 from 'bs58'
import { ed25519Verify } from './ed25519-helpers.js'

export function verifySignature({
  challenge,
  signature,
  publicKey,
}: {
  challenge: string
  signature: string
  publicKey: string
}) {
  const messageBytes = constructSolanaMessage(challenge)
  const publicKeyBytes = bs58.decode(publicKey)
  const signatureBytes = bs58.decode(signature)

  return ed25519Verify(signatureBytes, messageBytes, publicKeyBytes)
}

export function constructSolanaMessage(message: string): Uint8Array {
  const escapeSequenceFF = new Uint8Array([255])
  const signingDomain = new TextEncoder().encode('solana offchain')
  const headerVersion = new Uint8Array([0])
  const headerFormat = new Uint8Array([0])
  const messageLength = new Uint8Array([64, 0])
  const messageBytes = new TextEncoder().encode(message)

  const payload = new Uint8Array([
    ...escapeSequenceFF,
    ...signingDomain,
    ...headerVersion,
    ...headerFormat,
    ...messageLength,
    ...messageBytes,
  ])

  return payload
}

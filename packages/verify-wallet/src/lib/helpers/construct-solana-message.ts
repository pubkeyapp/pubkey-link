import { encodeMessage } from './encode-message'

export function constructSolanaMessage(message: string): Uint8Array {
  const escapeSequenceFF = new Uint8Array([255])
  const signingDomain = encodeMessage('solana offchain')
  const headerVersion = new Uint8Array([0])
  const headerFormat = new Uint8Array([0])
  const messageLength = new Uint8Array([64, 0])
  const messageBytes = encodeMessage(message)

  return new Uint8Array([
    ...escapeSequenceFF,
    ...signingDomain,
    ...headerVersion,
    ...headerFormat,
    ...messageLength,
    ...messageBytes,
  ])
}

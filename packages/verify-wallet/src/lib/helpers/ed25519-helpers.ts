import { sign } from 'tweetnacl'

export function ed25519Sign({ message, privateKey }: { message: Uint8Array; privateKey: Uint8Array }) {
  return sign.detached(message, privateKey)
}

export function ed25519Verify({
  message,
  publicKey,
  signature,
}: {
  message: Uint8Array
  publicKey: Uint8Array
  signature: Uint8Array
}) {
  return sign.detached.verify(message, signature.slice(0, 64), publicKey)
}

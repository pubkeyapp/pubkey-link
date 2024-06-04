import * as ed25519 from '@noble/ed25519'
import { sha512 } from '@noble/hashes/sha512'

ed25519.etc.sha512Sync = (...m) => sha512(ed25519.etc.concatBytes(...m))

export function ed25519RandomPrivateKey() {
  return ed25519.utils.randomPrivateKey()
}
export function ed25519GetPublicKey(privateKey: Uint8Array) {
  return ed25519.getPublicKey(privateKey)
}

export function ed25519Sign(privateKey: Uint8Array, message: Uint8Array) {
  return ed25519.sign(privateKey, message.slice(0, 32))
}

export function ed25519Verify(signature: Uint8Array, message: Uint8Array, publicKey: Uint8Array) {
  return ed25519.verify(signature, message, publicKey)
}

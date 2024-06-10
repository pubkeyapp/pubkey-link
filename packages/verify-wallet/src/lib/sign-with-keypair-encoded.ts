import { Keypair } from '@solana/web3.js'
import { bs58Encode, ed25519Sign } from './helpers'

export function signWithKeypairEncoded({ keypair, encoded }: { keypair: Keypair; encoded: Uint8Array }): string {
  return bs58Encode(ed25519Sign({ message: encoded, privateKey: keypair.secretKey }))
}

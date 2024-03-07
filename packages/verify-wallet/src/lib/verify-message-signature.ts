import { Keypair, PublicKey } from '@solana/web3.js'
import * as bs58 from 'bs58'
import { decode } from 'bs58'
import * as nacl from 'tweetnacl'
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

export function signWithKeypair({ keypair, message }: { keypair: Keypair; message: string }) {
  const encoded = new TextEncoder().encode(message)
  const signature = nacl.sign.detached(encoded, keypair.secretKey)

  return { message: bs58.encode(encoded), signature: bs58.encode(signature) }
}

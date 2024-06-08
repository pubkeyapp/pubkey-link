import { Keypair, PublicKey } from '@solana/web3.js'
import * as bs58 from 'bs58'
import { decode } from 'bs58'
import * as nacl from 'tweetnacl'
import { sign } from 'tweetnacl'
import { constructSolanaMessage } from 'verify-solana-wallet'

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
  const signature = signKeypair({ keypair, encoded })

  return { message: bs58.encode(encoded), signature }
}

export function encodeMessage(message: string) {
  return bs58.encode(new TextEncoder().encode(message))
}

export function signWithKeypairCli({ keypair, challenge }: { keypair: Keypair; challenge: string }) {
  return signKeypair({ keypair, encoded: constructSolanaMessage(challenge) })
}

function signKeypair({ keypair, encoded }: { keypair: Keypair; encoded: Uint8Array }) {
  const signature = nacl.sign.detached(encoded, keypair.secretKey)

  return bs58.encode(signature)
}

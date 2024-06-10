import { Keypair } from '@solana/web3.js'
import { bs58Encode, encodeMessage } from './helpers'
import { signWithKeypairEncoded } from './sign-with-keypair-encoded'
import { SignedChallenge } from './signed-challenge'

export function signWithKeypair({ keypair, message }: { keypair: Keypair; message: string }): SignedChallenge {
  const encoded = encodeMessage(message)
  const signature = signWithKeypairEncoded({ keypair, encoded })

  return { message: bs58Encode(encoded), signature }
}

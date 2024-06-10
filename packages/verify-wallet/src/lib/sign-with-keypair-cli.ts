import { Keypair } from '@solana/web3.js'
import { constructSolanaMessage } from './helpers'
import { signWithKeypairEncoded } from './sign-with-keypair-encoded'

export function signWithKeypairCli({ keypair, challenge }: { keypair: Keypair; challenge: string }): string {
  return signWithKeypairEncoded({ keypair, encoded: constructSolanaMessage(challenge) })
}

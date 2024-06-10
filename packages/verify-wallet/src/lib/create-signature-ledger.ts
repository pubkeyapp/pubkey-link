import { PublicKey, VersionedTransaction } from '@solana/web3.js'
import { createLedgerTransaction } from './create-ledger-transaction'
import { bs58Encode } from './helpers'
import { SignedChallenge } from './signed-challenge'

export interface CreateSignatureLedger {
  challenge: string
  blockhash: string
  publicKey: PublicKey | string
  signTransaction: (transaction: VersionedTransaction) => Promise<VersionedTransaction>
}

export async function createSignatureLedger({
  challenge,
  blockhash,
  publicKey,
  signTransaction,
}: CreateSignatureLedger): Promise<SignedChallenge> {
  const tx = createLedgerTransaction({ blockhash, challenge, publicKey })
  const { message, signatures } = await signTransaction(tx)

  return { message: bs58Encode(message.serialize()), signature: bs58Encode(signatures[0]) }
}

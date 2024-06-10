import { PublicKey, TransactionInstruction, TransactionMessage, VersionedTransaction } from '@solana/web3.js'
import { createLedgerPayload } from './create-ledger-payload'
import { MEMO_PROGRAM_ID } from './helpers/constants'

/**
 * Create a ledger transaction for a given challenge
 * @param recentBlockhash string Recent blockhash
 * @param challenge string Challenge to sign
 * @param publicKey PublicKey | string Public key to sign with
 */
export function createLedgerTransaction({
  blockhash: recentBlockhash,
  challenge,
  publicKey,
}: {
  blockhash: string
  challenge: string
  publicKey: PublicKey | string
}): VersionedTransaction {
  const payerKey = new PublicKey(publicKey)
  const data = createLedgerPayload({ publicKey, challenge })
  const ix = new TransactionInstruction({ data, keys: [], programId: new PublicKey(MEMO_PROGRAM_ID) })
  const message = new TransactionMessage({ instructions: [ix], payerKey, recentBlockhash }).compileToV0Message()

  return new VersionedTransaction(message)
}

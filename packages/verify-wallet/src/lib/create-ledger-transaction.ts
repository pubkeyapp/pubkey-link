import { sha256 } from '@noble/hashes/sha256'
import { bytesToHex } from '@noble/hashes/utils'
import { PublicKey, TransactionInstruction, TransactionMessage, VersionedTransaction } from '@solana/web3.js'
import { MEMO_PROGRAM_ID } from './constants'

function hashMessage({ challenge, publicKey }: { challenge: string; publicKey: PublicKey | string }) {
  const createdAt = Date.now()
  const challengeStr = JSON.stringify({ challenge, publicKey, createdAt })
  const hashStr = sha256(challengeStr)

  return bytesToHex(hashStr)
}

export function createLedgerTransaction({
  blockhash,
  challenge,
  publicKey,
}: {
  blockhash: string
  challenge: string
  publicKey: PublicKey | string
}): VersionedTransaction {
  const message = hashMessage({ publicKey, challenge })

  const txMessage = new TransactionMessage({
    instructions: [
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        keys: [],
        data: Buffer.from(message, 'utf8'),
      }),
    ],
    payerKey: new PublicKey(publicKey),
    recentBlockhash: blockhash,
  }).compileToV0Message()

  return new VersionedTransaction(txMessage)
}

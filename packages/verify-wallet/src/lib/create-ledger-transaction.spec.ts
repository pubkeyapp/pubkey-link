import { Keypair } from '@solana/web3.js'
import { createLedgerTransaction } from './create-ledger-transaction'
import { MEMO_PROGRAM_ID } from './helpers/constants'

describe('createLedgerTransaction', () => {
  it('should create a ledger transaction', () => {
    // ARRANGE
    const kp = Keypair.generate()
    const blockhash = 'test'
    const challenge = 'test'

    // ACT
    const tx = createLedgerTransaction({
      blockhash,
      challenge,
      publicKey: kp.publicKey,
    })

    // ASSERT
    expect(tx.signatures.length).toBe(1)
    expect(tx.signatures[0].join(',')).toMatchInlineSnapshot(
      `"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"`,
    )
    expect(tx.message.recentBlockhash).toBe('test')
    expect(tx.message.getAccountKeys().staticAccountKeys.map((k) => k.toBase58())).toEqual(
      [kp.publicKey.toBase58(), MEMO_PROGRAM_ID.toBase58()].sort(),
    )
  })
})

import { createLedgerPayload } from './create-ledger-payload'
import { bs58Encode } from './helpers'
import { MEMO_PROGRAM_ID } from './helpers/constants'

describe('create-ledger-payload', () => {
  const challenge = 'test'
  const publicKey = MEMO_PROGRAM_ID

  it('should create a ledger payload', () => {
    const message = createLedgerPayload({ challenge, publicKey })

    expect(message).toBeDefined()

    expect(bs58Encode(message).length).toBeLessThanOrEqual(88)
    expect(bs58Encode(message).length).toBeGreaterThanOrEqual(87)
  })
})

import { encode } from 'bs58'
import { MEMO_PROGRAM_ID } from './constants'
import { createLedgerPayload } from './create-ledger-payload'

describe('createLedgerPayload', () => {
  const challenge = 'test'
  const publicKey = MEMO_PROGRAM_ID

  it('should create a ledger payload', () => {
    const message = createLedgerPayload({ challenge, publicKey })

    expect(message).toBeDefined()

    expect(encode(message).length).toBeLessThanOrEqual(88)
    expect(encode(message).length).toBeGreaterThanOrEqual(87)
  })
})

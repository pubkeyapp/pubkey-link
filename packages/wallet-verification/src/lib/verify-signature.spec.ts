import { verifySignature } from './verify-signature'

describe('verify-signature', () => {
  it('should be implemented', () => {
    // ARRANGE
    const publicKey = 'HWC19p2SnXVPuXvehYJCLM5rq57XtdUdVJMBeZr1nyDH'
    const signature = '3RTLXAFdQQZcZZh1jWmfZCcXjZfTbpPTHrU9Rr5Lbof2KYmxkoWiLV5yDgu3Va4zZJ1uhHjGDzwzXsTfXSgjUeno'
    const challenge = '5bf2b134e57a595efe9162ad79d45185f2417ca6332953c4cb459898c36fe047'
    // ACT

    const isValid = verifySignature({ challenge, signature, publicKey })

    // ASSERT
    expect(verifySignature).toBeDefined()
    expect(isValid).toBeTruthy()
  })
})

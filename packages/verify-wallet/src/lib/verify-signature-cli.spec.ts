import { verifySignatureCli, VerifySignatureCliOptions } from './verify-signature-cli'

describe('verify-signature-cli', () => {
  it('should verify a signature', () => {
    // ARRANGE
    const input: VerifySignatureCliOptions = {
      challenge: '5bf2b134e57a595efe9162ad79d45185f2417ca6332953c4cb459898c36fe047',
      signature: '3RTLXAFdQQZcZZh1jWmfZCcXjZfTbpPTHrU9Rr5Lbof2KYmxkoWiLV5yDgu3Va4zZJ1uhHjGDzwzXsTfXSgjUeno',
      publicKey: 'HWC19p2SnXVPuXvehYJCLM5rq57XtdUdVJMBeZr1nyDH',
    }

    // ACT
    const isValid = verifySignatureCli(input)

    // ASSERT
    expect(isValid).toBeTruthy()
  })
})

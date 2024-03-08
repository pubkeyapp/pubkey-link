import { getAliceCookie, getBobCookie } from '../support'

describe('api-network-feature', () => {
  describe('api-network-user-resolver', () => {
    let alice: string
    let bob: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      bob = await getBobCookie()
    })

    describe('authorized', () => {
      it('should be implemented', async () => {
        expect(alice).toBeDefined()
      })
    })

    describe('unauthorized', () => {
      it('should be implemented', async () => {
        expect(bob).toBeDefined()
      })
    })
  })
})

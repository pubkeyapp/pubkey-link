import { getAliceCookie, getBobCookie, sdk } from '../support'

const defaultCommunityId = 'pubkey'
fdescribe('api-log-feature', () => {
  describe('api-log-user-resolver', () => {
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
    })

    xdescribe('authorized', () => {
      beforeAll(async () => {
        alice = await getAliceCookie()
      })

      it('should find a list of logs (find all)', async () => {
        const res = await sdk.userFindManyLog({ input: { communityId: defaultCommunityId } }, { cookie: alice })
        const logId = res.data.paging.data[0].id

        expect(res.data.paging.meta.totalCount).toBeGreaterThanOrEqual(1)
        expect(res.data.paging.data.length).toBeGreaterThanOrEqual(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(logId)
      })

      it('should find a log by id', async () => {
        const logs = await sdk.userFindManyLog({ input: { communityId: defaultCommunityId } }, { cookie: alice })
        const logId = logs.data.paging.data[0].id

        const res = await sdk.userFindOneLog({ logId }, { cookie: alice })
        expect(res.data.item.id).toBe(logId)
      })
    })

    describe('unauthorized', () => {
      let bob: string
      beforeAll(async () => {
        bob = await getBobCookie()
      })

      it('should not find a list of logs (find all)', async () => {
        expect.assertions(1)
        try {
          const log = await sdk.userFindManyLog({ input: {} }, { cookie: bob })
          console.log('log', log.data.paging?.data)
        } catch (e) {
          expect(e.message).toBe('CommunityId is required')
        }
      })

      it('should not find a log by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneLog({ logId: '123123' }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Log not found')
        }
      })
    })
  })
})

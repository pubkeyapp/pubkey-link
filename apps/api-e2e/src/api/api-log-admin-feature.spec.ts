import { AdminFindManyLogInput } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk } from '../support'

describe('api-log-feature', () => {
  describe('api-log-admin-resolver', () => {
    let logId: string
    let alice: string
    let bob: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      bob = await getBobCookie()
    })

    describe('authorized', () => {
      it('should find a list of logs (find all)', async () => {
        const input: AdminFindManyLogInput = {}

        const res = await sdk.adminFindManyLog({ input }, { cookie: alice })
        logId = res.data.paging.data[0].id
        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
      })

      it('should find a list of logs (find new one)', async () => {
        const input: AdminFindManyLogInput = {
          search: logId,
        }

        const res = await sdk.adminFindManyLog({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThanOrEqual(1)
        expect(res.data.paging.data.length).toBeGreaterThanOrEqual(1)
        expect(res.data.paging.data[0].id).toBe(logId)
      })

      it('should find a log by id', async () => {
        const res = await sdk.adminFindOneLog({ logId }, { cookie: alice })

        expect(res.data.item.id).toBe(logId)
      })

      it('should delete a log', async () => {
        const res = await sdk.adminDeleteLog({ logId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyLog({ input: { search: logId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      it('should not find a list of logs (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyLog({ input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a log by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneLog({ logId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a log', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteLog({ logId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})

import { AdminCreateLogInput, AdminFindManyLogInput, AdminUpdateLogInput, Log } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-log-feature', () => {
  describe('api-log-admin-resolver', () => {
    const logName = uniqueId('acme-log')
    let logId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateLog({ input: { name: logName } }, { cookie })
      logId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a log', async () => {
        const input: AdminCreateLogInput = {
          name: uniqueId('log'),
        }

        const res = await sdk.adminCreateLog({ input }, { cookie })

        const item: Log = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a log', async () => {
        const createInput: AdminCreateLogInput = {
          name: uniqueId('log'),
        }
        const createdRes = await sdk.adminCreateLog({ input: createInput }, { cookie })
        const logId = createdRes.data.created.id
        const input: AdminUpdateLogInput = {
          name: uniqueId('log'),
        }

        const res = await sdk.adminUpdateLog({ logId, input }, { cookie })

        const item: Log = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of logs (find all)', async () => {
        const createInput: AdminCreateLogInput = {
          name: uniqueId('log'),
        }
        const createdRes = await sdk.adminCreateLog({ input: createInput }, { cookie })
        const logId = createdRes.data.created.id

        const input: AdminFindManyLogInput = {}

        const res = await sdk.adminFindManyLog({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(logId)
      })

      it('should find a list of logs (find new one)', async () => {
        const createInput: AdminCreateLogInput = {
          name: uniqueId('log'),
        }
        const createdRes = await sdk.adminCreateLog({ input: createInput }, { cookie })
        const logId = createdRes.data.created.id

        const input: AdminFindManyLogInput = {
          search: logId,
        }

        const res = await sdk.adminFindManyLog({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(logId)
      })

      it('should find a log by id', async () => {
        const createInput: AdminCreateLogInput = {
          name: uniqueId('log'),
        }
        const createdRes = await sdk.adminCreateLog({ input: createInput }, { cookie })
        const logId = createdRes.data.created.id

        const res = await sdk.adminFindOneLog({ logId }, { cookie })

        expect(res.data.item.id).toBe(logId)
      })

      it('should delete a log', async () => {
        const createInput: AdminCreateLogInput = {
          name: uniqueId('log'),
        }
        const createdRes = await sdk.adminCreateLog({ input: createInput }, { cookie })
        const logId = createdRes.data.created.id

        const res = await sdk.adminDeleteLog({ logId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyLog({ input: { search: logId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a log', async () => {
        expect.assertions(1)
        const input: AdminCreateLogInput = {
          name: uniqueId('log'),
        }

        try {
          await sdk.adminCreateLog({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a log', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateLog({ logId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of logs (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyLog({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a log by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneLog({ logId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a log', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteLog({ logId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})

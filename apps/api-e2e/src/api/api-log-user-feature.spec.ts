import { UserCreateLogInput, UserFindManyLogInput, UserUpdateLogInput, Log } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-log-feature', () => {
  describe('api-log-user-resolver', () => {
    const logName = uniqueId('acme-log')
    let logId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreateLog({ input: { name: logName } }, { cookie })
      logId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a log', async () => {
        const input: UserCreateLogInput = {
          name: uniqueId('log'),
        }

        const res = await sdk.userCreateLog({ input }, { cookie })

        const item: Log = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a log', async () => {
        const createInput: UserCreateLogInput = {
          name: uniqueId('log'),
        }
        const createdRes = await sdk.userCreateLog({ input: createInput }, { cookie })
        const logId = createdRes.data.created.id
        const input: UserUpdateLogInput = {
          name: uniqueId('log'),
        }

        const res = await sdk.userUpdateLog({ logId, input }, { cookie })

        const item: Log = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of logs (find all)', async () => {
        const createInput: UserCreateLogInput = {
          name: uniqueId('log'),
        }
        const createdRes = await sdk.userCreateLog({ input: createInput }, { cookie })
        const logId = createdRes.data.created.id

        const input: UserFindManyLogInput = {}

        const res = await sdk.userFindManyLog({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(logId)
      })

      it('should find a list of logs (find new one)', async () => {
        const createInput: UserCreateLogInput = {
          name: uniqueId('log'),
        }
        const createdRes = await sdk.userCreateLog({ input: createInput }, { cookie })
        const logId = createdRes.data.created.id

        const input: UserFindManyLogInput = {
          search: logId,
        }

        const res = await sdk.userFindManyLog({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(logId)
      })

      it('should find a log by id', async () => {
        const createInput: UserCreateLogInput = {
          name: uniqueId('log'),
        }
        const createdRes = await sdk.userCreateLog({ input: createInput }, { cookie })
        const logId = createdRes.data.created.id

        const res = await sdk.userFindOneLog({ logId }, { cookie })

        expect(res.data.item.id).toBe(logId)
      })

      it('should delete a log', async () => {
        const createInput: UserCreateLogInput = {
          name: uniqueId('log'),
        }
        const createdRes = await sdk.userCreateLog({ input: createInput }, { cookie })
        const logId = createdRes.data.created.id

        const res = await sdk.userDeleteLog({ logId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyLog({ input: { search: logId } }, { cookie })
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
        const input: UserCreateLogInput = {
          name: uniqueId('log'),
        }

        try {
          await sdk.userCreateLog({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not update a log', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateLog({ logId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a list of logs (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindManyLog({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a log by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneLog({ logId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not delete a log', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteLog({ logId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })
    })
  })
})

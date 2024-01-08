import { AdminCreateAppInput, AdminFindManyAppInput, AdminUpdateAppInput, App } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-app-feature', () => {
  describe('api-app-admin-resolver', () => {
    const appName = uniqueId('acme-app')
    let appId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateApp({ input: { name: appName } }, { cookie })
      appId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a app', async () => {
        const input: AdminCreateAppInput = {
          name: uniqueId('app'),
        }

        const res = await sdk.adminCreateApp({ input }, { cookie })

        const item: App = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a app', async () => {
        const createInput: AdminCreateAppInput = {
          name: uniqueId('app'),
        }
        const createdRes = await sdk.adminCreateApp({ input: createInput }, { cookie })
        const appId = createdRes.data.created.id
        const input: AdminUpdateAppInput = {
          name: uniqueId('app'),
        }

        const res = await sdk.adminUpdateApp({ appId, input }, { cookie })

        const item: App = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of apps (find all)', async () => {
        const createInput: AdminCreateAppInput = {
          name: uniqueId('app'),
        }
        const createdRes = await sdk.adminCreateApp({ input: createInput }, { cookie })
        const appId = createdRes.data.created.id

        const input: AdminFindManyAppInput = {}

        const res = await sdk.adminFindManyApp({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(appId)
      })

      it('should find a list of apps (find new one)', async () => {
        const createInput: AdminCreateAppInput = {
          name: uniqueId('app'),
        }
        const createdRes = await sdk.adminCreateApp({ input: createInput }, { cookie })
        const appId = createdRes.data.created.id

        const input: AdminFindManyAppInput = {
          search: appId,
        }

        const res = await sdk.adminFindManyApp({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(appId)
      })

      it('should find a app by id', async () => {
        const createInput: AdminCreateAppInput = {
          name: uniqueId('app'),
        }
        const createdRes = await sdk.adminCreateApp({ input: createInput }, { cookie })
        const appId = createdRes.data.created.id

        const res = await sdk.adminFindOneApp({ appId }, { cookie })

        expect(res.data.item.id).toBe(appId)
      })

      it('should delete a app', async () => {
        const createInput: AdminCreateAppInput = {
          name: uniqueId('app'),
        }
        const createdRes = await sdk.adminCreateApp({ input: createInput }, { cookie })
        const appId = createdRes.data.created.id

        const res = await sdk.adminDeleteApp({ appId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyApp({ input: { search: appId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a app', async () => {
        expect.assertions(1)
        const input: AdminCreateAppInput = {
          name: uniqueId('app'),
        }

        try {
          await sdk.adminCreateApp({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a app', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateApp({ appId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of apps (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyApp({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a app by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneApp({ appId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a app', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteApp({ appId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})

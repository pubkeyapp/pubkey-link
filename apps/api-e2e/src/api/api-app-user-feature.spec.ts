import { AdminCreateAppUserInput, AdminFindManyAppUserInput, AdminUpdateAppUserInput, AppUser } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-app-user-feature', () => {
  describe('api-app-user-admin-resolver', () => {
    const app-userName = uniqueId('acme-app-user')
    let appUserId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateAppUser({ input: { name: app-userName } }, { cookie })
      appUserId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a app-user', async () => {
        const input: AdminCreateAppUserInput = {
          name: uniqueId('app-user'),
        }

        const res = await sdk.adminCreateAppUser({ input }, { cookie })

        const item: AppUser = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a app-user', async () => {
        const createInput: AdminCreateAppUserInput = {
          name: uniqueId('app-user'),
        }
        const createdRes = await sdk.adminCreateAppUser({ input: createInput }, { cookie })
        const appUserId = createdRes.data.created.id
        const input: AdminUpdateAppUserInput = {
          name: uniqueId('app-user'),
        }

        const res = await sdk.adminUpdateAppUser({ appUserId, input }, { cookie })

        const item: AppUser = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of appUsers (find all)', async () => {
        const createInput: AdminCreateAppUserInput = {
          name: uniqueId('app-user'),
        }
        const createdRes = await sdk.adminCreateAppUser({ input: createInput }, { cookie })
        const appUserId = createdRes.data.created.id

        const input: AdminFindManyAppUserInput = {}

        const res = await sdk.adminFindManyAppUser({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        console.log(res.data.paging.data)
        expect(res.data.paging.data[0].id).toBe(appUserId)
      })

      it('should find a list of appUsers (find new one)', async () => {
        const createInput: AdminCreateAppUserInput = {
          name: uniqueId('app-user'),
        }
        const createdRes = await sdk.adminCreateAppUser({ input: createInput }, { cookie })
        const appUserId = createdRes.data.created.id

        const input: AdminFindManyAppUserInput = {
          search: appUserId,
        }

        const res = await sdk.adminFindManyAppUser({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(appUserId)
      })

      it('should find a app-user by id', async () => {
        const createInput: AdminCreateAppUserInput = {
          name: uniqueId('app-user'),
        }
        const createdRes = await sdk.adminCreateAppUser({ input: createInput }, { cookie })
        const appUserId = createdRes.data.created.id

        const res = await sdk.adminFindOneAppUser({ appUserId }, { cookie })

        expect(res.data.item.id).toBe(appUserId)
      })

      it('should delete a app-user', async () => {
        const createInput: AdminCreateAppUserInput = {
          name: uniqueId('app-user'),
        }
        const createdRes = await sdk.adminCreateAppUser({ input: createInput }, { cookie })
        const appUserId = createdRes.data.created.id

        const res = await sdk.adminDeleteAppUser({ appUserId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyAppUser({ input: { search: appUserId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a app-user', async () => {
        expect.assertions(1)
        const input: AdminCreateAppUserInput = {
          name: uniqueId('app-user'),
        }

        try {
          await sdk.adminCreateAppUser({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a app-user', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateAppUser({ appUserId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of appUsers (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyAppUser({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a app-user by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneAppUser({ appUserId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a app-user', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteAppUser({ appUserId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})

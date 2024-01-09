import {
  AdminCreateAppUserInput,
  AdminFindManyAppUserInput,
  AdminUpdateAppUserInput,
  AppUser,
  AppUserRole,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-app-user-feature', () => {
  describe('api-app-user-admin-resolver', () => {
    let alice: string
    let userId: string
    let appId: string

    beforeAll(async () => {
      alice = await getAliceCookie()
    })
    beforeEach(async () => {
      appId = await sdk
        .adminCreateApp({ input: { name: uniqueId('app') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      userId = await sdk
        .adminCreateUser({ input: { username: uniqueId('user') } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })

    describe('authorized', () => {
      it('should create a app-user', async () => {
        const input: AdminCreateAppUserInput = {
          role: AppUserRole.User,
          userId,
          appId,
        }

        const res = await sdk.adminCreateAppUser({ input }, { cookie: alice })

        const item: AppUser = res.data.created
        expect(item.role).toBe(input.role)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a app-user', async () => {
        const createInput: AdminCreateAppUserInput = {
          role: AppUserRole.User,
          userId,
          appId,
        }
        const createdRes = await sdk.adminCreateAppUser({ input: createInput }, { cookie: alice })
        const appUserId = createdRes.data.created.id
        const input: AdminUpdateAppUserInput = {
          role: AppUserRole.Admin,
          userId,
          appId,
        }

        const res = await sdk.adminUpdateAppUser({ appUserId, input }, { cookie: alice })

        const item: AppUser = res.data.updated
        expect(item.role).toBe(input.role)
      })

      it('should find a list of appUsers (find all)', async () => {
        const createInput: AdminCreateAppUserInput = {
          role: AppUserRole.User,
          userId,
          appId,
        }
        const createdRes = await sdk.adminCreateAppUser({ input: createInput }, { cookie: alice })
        const appUserId = createdRes.data.created.id

        const input: AdminFindManyAppUserInput = {
          appId,
        }

        const res = await sdk.adminFindManyAppUser({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(appUserId)
      })

      it('should find a list of appUsers (find new one)', async () => {
        const createInput: AdminCreateAppUserInput = {
          role: AppUserRole.User,
          userId,
          appId,
        }
        const createdRes = await sdk.adminCreateAppUser({ input: createInput }, { cookie: alice })
        const appUserId = createdRes.data.created.id

        const input: AdminFindManyAppUserInput = {
          appId,
          search: appUserId,
        }

        const res = await sdk.adminFindManyAppUser({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(appUserId)
      })

      it('should find a app-user by id', async () => {
        const createInput: AdminCreateAppUserInput = {
          role: AppUserRole.User,
          userId,
          appId,
        }
        const createdRes = await sdk.adminCreateAppUser({ input: createInput }, { cookie: alice })
        const appUserId = createdRes.data.created.id

        const res = await sdk.adminFindOneAppUser({ appUserId }, { cookie: alice })

        expect(res.data.item.id).toBe(appUserId)
      })

      it('should delete a app-user', async () => {
        const createInput: AdminCreateAppUserInput = {
          role: AppUserRole.User,
          userId,
          appId,
        }
        const createdRes = await sdk.adminCreateAppUser({ input: createInput }, { cookie: alice })
        const appUserId = createdRes.data.created.id

        const res = await sdk.adminDeleteAppUser({ appUserId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyAppUser({ input: { appId, search: appUserId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let bob: string

      beforeAll(async () => {
        bob = await getBobCookie()
      })

      it('should not create a app-user', async () => {
        expect.assertions(1)
        const input: AdminCreateAppUserInput = {
          role: AppUserRole.User,
          userId,
          appId,
        }

        try {
          await sdk.adminCreateAppUser({ input }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a app-user', async () => {
        expect.assertions(1)
        const appUserId = await sdk
          .adminCreateAppUser({ input: { role: AppUserRole.User, userId, appId } }, { cookie: alice })
          .then((res) => res.data.created.id)

        try {
          const updated = await sdk.adminUpdateAppUser(
            { appUserId, input: { appId, role: AppUserRole.Admin, userId } },
            { cookie: bob },
          )
          console.log('updated', updated)
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of appUsers (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyAppUser({ input: { appId } }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a app-user by id', async () => {
        const appUserId = await sdk
          .adminCreateAppUser({ input: { role: AppUserRole.User, userId, appId } }, { cookie: alice })
          .then((res) => res.data.created.id)

        expect.assertions(1)
        try {
          await sdk.adminFindOneAppUser({ appUserId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete an app-user', async () => {
        const appUserId = await sdk
          .adminCreateAppUser({ input: { role: AppUserRole.User, userId, appId } }, { cookie: alice })
          .then((res) => res.data.created.id)

        expect.assertions(1)
        try {
          await sdk.adminDeleteAppUser({ appUserId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})

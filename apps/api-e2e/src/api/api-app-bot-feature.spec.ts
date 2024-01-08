import { AdminCreateAppBotInput, AdminFindManyAppBotInput, AdminUpdateAppBotInput, AppBot } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-app-bot-feature', () => {
  describe('api-app-bot-admin-resolver', () => {
    const app-botName = uniqueId('acme-app-bot')
    let appBotId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateAppBot({ input: { name: app-botName } }, { cookie })
      appBotId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a app-bot', async () => {
        const input: AdminCreateAppBotInput = {
          name: uniqueId('app-bot'),
        }

        const res = await sdk.adminCreateAppBot({ input }, { cookie })

        const item: AppBot = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a app-bot', async () => {
        const createInput: AdminCreateAppBotInput = {
          name: uniqueId('app-bot'),
        }
        const createdRes = await sdk.adminCreateAppBot({ input: createInput }, { cookie })
        const appBotId = createdRes.data.created.id
        const input: AdminUpdateAppBotInput = {
          name: uniqueId('app-bot'),
        }

        const res = await sdk.adminUpdateAppBot({ appBotId, input }, { cookie })

        const item: AppBot = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of appBots (find all)', async () => {
        const createInput: AdminCreateAppBotInput = {
          name: uniqueId('app-bot'),
        }
        const createdRes = await sdk.adminCreateAppBot({ input: createInput }, { cookie })
        const appBotId = createdRes.data.created.id

        const input: AdminFindManyAppBotInput = {}

        const res = await sdk.adminFindManyAppBot({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        console.log(res.data.paging.data)
        expect(res.data.paging.data[0].id).toBe(appBotId)
      })

      it('should find a list of appBots (find new one)', async () => {
        const createInput: AdminCreateAppBotInput = {
          name: uniqueId('app-bot'),
        }
        const createdRes = await sdk.adminCreateAppBot({ input: createInput }, { cookie })
        const appBotId = createdRes.data.created.id

        const input: AdminFindManyAppBotInput = {
          search: appBotId,
        }

        const res = await sdk.adminFindManyAppBot({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(appBotId)
      })

      it('should find a app-bot by id', async () => {
        const createInput: AdminCreateAppBotInput = {
          name: uniqueId('app-bot'),
        }
        const createdRes = await sdk.adminCreateAppBot({ input: createInput }, { cookie })
        const appBotId = createdRes.data.created.id

        const res = await sdk.adminFindOneAppBot({ appBotId }, { cookie })

        expect(res.data.item.id).toBe(appBotId)
      })

      it('should delete a app-bot', async () => {
        const createInput: AdminCreateAppBotInput = {
          name: uniqueId('app-bot'),
        }
        const createdRes = await sdk.adminCreateAppBot({ input: createInput }, { cookie })
        const appBotId = createdRes.data.created.id

        const res = await sdk.adminDeleteAppBot({ appBotId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyAppBot({ input: { search: appBotId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a app-bot', async () => {
        expect.assertions(1)
        const input: AdminCreateAppBotInput = {
          name: uniqueId('app-bot'),
        }

        try {
          await sdk.adminCreateAppBot({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a app-bot', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateAppBot({ appBotId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of appBots (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyAppBot({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a app-bot by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneAppBot({ appBotId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a app-bot', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteAppBot({ appBotId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})

import {
  AdminCreateAppBotInput,
  AdminFindManyAppBotInput,
  AdminUpdateAppBotInput,
  AppBot,
  AppBotProvider,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-app-bot-feature', () => {
  describe('api-app-bot-admin-resolver', () => {
    let alice: string
    let appId: string

    const provider = AppBotProvider.Discord
    const clientId = uniqueId('client-id')
    const clientSecret = uniqueId('client-secret')
    const token = uniqueId('token')

    function getCreateInput(appId: string): AdminCreateAppBotInput {
      return {
        name: uniqueId(`${appId}-bot`),
        appId,
        provider,
        clientId,
        clientSecret,
        token,
      }
    }
    beforeEach(async () => {
      alice = await getAliceCookie()
      const created = await sdk.adminCreateApp({ input: { name: uniqueId('app') } }, { cookie: alice })
      appId = created.data.created.id
    })

    describe('authorized', () => {
      it('should create a app-bot', async () => {
        const input: AdminCreateAppBotInput = getCreateInput(appId)
        const res = await sdk.adminCreateAppBot({ input }, { cookie: alice })

        const item: AppBot = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a app-bot', async () => {
        const createInput: AdminCreateAppBotInput = getCreateInput(appId)
        const createdRes = await sdk.adminCreateAppBot({ input: createInput }, { cookie: alice })
        const appBotId = createdRes.data.created.id
        const input: AdminUpdateAppBotInput = {
          name: uniqueId('app-bot'),
        }

        const res = await sdk.adminUpdateAppBot({ appBotId, input }, { cookie: alice })

        const item: AppBot = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of appBots (find all)', async () => {
        const createInput: AdminCreateAppBotInput = getCreateInput(appId)
        const createdRes = await sdk.adminCreateAppBot({ input: createInput }, { cookie: alice })
        const appBotId = createdRes.data.created.id

        const input: AdminFindManyAppBotInput = {
          appId,
        }

        const res = await sdk.adminFindManyAppBot({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThanOrEqual(1)
        expect(res.data.paging.data.length).toBeGreaterThanOrEqual(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(appBotId)
      })

      it('should find a list of appBots (find new one)', async () => {
        const createInput: AdminCreateAppBotInput = getCreateInput(appId)
        const createdRes = await sdk.adminCreateAppBot({ input: createInput }, { cookie: alice })
        const appBotId = createdRes.data.created.id

        const input: AdminFindManyAppBotInput = {
          appId,
          search: appBotId,
        }

        const res = await sdk.adminFindManyAppBot({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(appBotId)
      })

      it('should find a app-bot by id', async () => {
        const createInput: AdminCreateAppBotInput = getCreateInput(appId)
        const createdRes = await sdk.adminCreateAppBot({ input: createInput }, { cookie: alice })
        const appBotId = createdRes.data.created.id

        const res = await sdk.adminFindOneAppBot({ appBotId }, { cookie: alice })

        expect(res.data.item.id).toBe(appBotId)
      })

      it('should delete a app-bot', async () => {
        const createInput: AdminCreateAppBotInput = getCreateInput(appId)
        const createdRes = await sdk.adminCreateAppBot({ input: createInput }, { cookie: alice })
        const appBotId = createdRes.data.created.id

        const res = await sdk.adminDeleteAppBot({ appBotId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyAppBot({ input: { appId, search: appBotId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      let appBotId: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })
      beforeEach(async () => {
        appBotId = await sdk
          .adminCreateAppBot({ input: getCreateInput(appId) }, { cookie: alice })
          .then((res) => res.data.created.id)
      })

      it('should not create a app-bot', async () => {
        expect.assertions(1)
        const input: AdminCreateAppBotInput = getCreateInput(appId)

        try {
          await sdk.adminCreateAppBot({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a app-bot', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateAppBot({ appBotId, input: { name: uniqueId('app-bot') } }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of appBots (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyAppBot({ input: { appId } }, { cookie })
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

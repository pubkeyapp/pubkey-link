import { AdminCreateBotInput, AdminFindManyBotInput, AdminUpdateBotInput, Bot } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-bot-feature', () => {
  describe('api-bot-admin-resolver', () => {
    const botName = uniqueId('acme-bot')
    let botId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateBot({ input: { name: botName } }, { cookie })
      botId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a bot', async () => {
        const input: AdminCreateBotInput = {
          name: uniqueId('bot'),
        }

        const res = await sdk.adminCreateBot({ input }, { cookie })

        const item: Bot = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a bot', async () => {
        const createInput: AdminCreateBotInput = {
          name: uniqueId('bot'),
        }
        const createdRes = await sdk.adminCreateBot({ input: createInput }, { cookie })
        const botId = createdRes.data.created.id
        const input: AdminUpdateBotInput = {
          name: uniqueId('bot'),
        }

        const res = await sdk.adminUpdateBot({ botId, input }, { cookie })

        const item: Bot = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of bots (find all)', async () => {
        const createInput: AdminCreateBotInput = {
          name: uniqueId('bot'),
        }
        const createdRes = await sdk.adminCreateBot({ input: createInput }, { cookie })
        const botId = createdRes.data.created.id

        const input: AdminFindManyBotInput = {}

        const res = await sdk.adminFindManyBot({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(botId)
      })

      it('should find a list of bots (find new one)', async () => {
        const createInput: AdminCreateBotInput = {
          name: uniqueId('bot'),
        }
        const createdRes = await sdk.adminCreateBot({ input: createInput }, { cookie })
        const botId = createdRes.data.created.id

        const input: AdminFindManyBotInput = {
          search: botId,
        }

        const res = await sdk.adminFindManyBot({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(botId)
      })

      it('should find a bot by id', async () => {
        const createInput: AdminCreateBotInput = {
          name: uniqueId('bot'),
        }
        const createdRes = await sdk.adminCreateBot({ input: createInput }, { cookie })
        const botId = createdRes.data.created.id

        const res = await sdk.adminFindOneBot({ botId }, { cookie })

        expect(res.data.item.id).toBe(botId)
      })

      it('should delete a bot', async () => {
        const createInput: AdminCreateBotInput = {
          name: uniqueId('bot'),
        }
        const createdRes = await sdk.adminCreateBot({ input: createInput }, { cookie })
        const botId = createdRes.data.created.id

        const res = await sdk.adminDeleteBot({ botId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyBot({ input: { search: botId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a bot', async () => {
        expect.assertions(1)
        const input: AdminCreateBotInput = {
          name: uniqueId('bot'),
        }

        try {
          await sdk.adminCreateBot({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a bot', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateBot({ botId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of bots (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyBot({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a bot by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneBot({ botId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a bot', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteBot({ botId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})

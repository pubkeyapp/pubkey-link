import { AdminCreateBotInput, Bot, UserCreateBotInput, UserUpdateBotInput } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk } from '../support'

const defaultCommunityId = 'pubkey'
const defaultInput: AdminCreateBotInput = {
  communityId: defaultCommunityId,
  clientId: 'pubkey',
  clientSecret: 'pubkey',
  token: 'pubkey',
}

// TODO: Figure out how to test this
// The challenge is that we're depending on Discord when creating a bot
// So we need to mock the Discord API when running the tests

xdescribe('api-bot-feature', () => {
  describe('api-bot-user-resolver', () => {
    let botId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreateBot({ input: defaultInput }, { cookie })
      botId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a bot', async () => {
        const res = await sdk.userCreateBot({ input: defaultInput }, { cookie })

        const item: Bot = res.data.created
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a bot', async () => {
        const createInput: UserCreateBotInput = defaultInput
        const createdRes = await sdk.userCreateBot({ input: createInput }, { cookie })
        const botId = createdRes.data.created.id
        const input: UserUpdateBotInput = defaultInput

        const res = await sdk.userUpdateBot({ botId, input }, { cookie })

        const item: Bot = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a bot by id', async () => {
        const createInput: UserCreateBotInput = defaultInput
        const createdRes = await sdk.userCreateBot({ input: createInput }, { cookie })
        const botId = createdRes.data.created.id

        const res = await sdk.userFindOneBot({ communityId: defaultCommunityId }, { cookie })

        expect(res.data.item.id).toBe(botId)
      })

      it('should delete a bot', async () => {
        const createInput: UserCreateBotInput = defaultInput
        const createdRes = await sdk.userCreateBot({ input: createInput }, { cookie })
        const botId = createdRes.data.created.id

        const res = await sdk.userDeleteBot({ botId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindOneBot({ communityId: defaultCommunityId }, { cookie })
        expect(findRes.data.item).toBeNull()
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a bot', async () => {
        expect.assertions(1)
        const input: UserCreateBotInput = defaultInput

        try {
          await sdk.userCreateBot({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not update a bot', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateBot({ botId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a bot by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneBot({ communityId: defaultCommunityId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not delete a bot', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteBot({ botId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })
    })
  })
})

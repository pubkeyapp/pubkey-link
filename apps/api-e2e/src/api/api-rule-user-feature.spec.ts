import { UserCreateRuleInput, UserFindManyRuleInput, UserUpdateRuleInput, Rule } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-rule-feature', () => {
  describe('api-rule-user-resolver', () => {
    const ruleName = uniqueId('acme-rule')
    let ruleId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreateRule({ input: { name: ruleName } }, { cookie })
      ruleId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a rule', async () => {
        const input: UserCreateRuleInput = {
          name: uniqueId('rule'),
        }

        const res = await sdk.userCreateRule({ input }, { cookie })

        const item: Rule = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a rule', async () => {
        const createInput: UserCreateRuleInput = {
          name: uniqueId('rule'),
        }
        const createdRes = await sdk.userCreateRule({ input: createInput }, { cookie })
        const ruleId = createdRes.data.created.id
        const input: UserUpdateRuleInput = {
          name: uniqueId('rule'),
        }

        const res = await sdk.userUpdateRule({ ruleId, input }, { cookie })

        const item: Rule = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of rules (find all)', async () => {
        const createInput: UserCreateRuleInput = {
          name: uniqueId('rule'),
        }
        const createdRes = await sdk.userCreateRule({ input: createInput }, { cookie })
        const ruleId = createdRes.data.created.id

        const input: UserFindManyRuleInput = {}

        const res = await sdk.userFindManyRule({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(ruleId)
      })

      it('should find a list of rules (find new one)', async () => {
        const createInput: UserCreateRuleInput = {
          name: uniqueId('rule'),
        }
        const createdRes = await sdk.userCreateRule({ input: createInput }, { cookie })
        const ruleId = createdRes.data.created.id

        const input: UserFindManyRuleInput = {
          search: ruleId,
        }

        const res = await sdk.userFindManyRule({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(ruleId)
      })

      it('should find a rule by id', async () => {
        const createInput: UserCreateRuleInput = {
          name: uniqueId('rule'),
        }
        const createdRes = await sdk.userCreateRule({ input: createInput }, { cookie })
        const ruleId = createdRes.data.created.id

        const res = await sdk.userFindOneRule({ ruleId }, { cookie })

        expect(res.data.item.id).toBe(ruleId)
      })

      it('should delete a rule', async () => {
        const createInput: UserCreateRuleInput = {
          name: uniqueId('rule'),
        }
        const createdRes = await sdk.userCreateRule({ input: createInput }, { cookie })
        const ruleId = createdRes.data.created.id

        const res = await sdk.userDeleteRule({ ruleId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyRule({ input: { search: ruleId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a rule', async () => {
        expect.assertions(1)
        const input: UserCreateRuleInput = {
          name: uniqueId('rule'),
        }

        try {
          await sdk.userCreateRule({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not update a rule', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateRule({ ruleId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a list of rules (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindManyRule({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not find a rule by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneRule({ ruleId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })

      it('should not delete a rule', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteRule({ ruleId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not User')
        }
      })
    })
  })
})

import { AdminCreateRuleInput, AdminFindManyRuleInput, AdminUpdateRuleInput, Rule } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-rule-feature', () => {
  describe('api-rule-admin-resolver', () => {
    const ruleName = uniqueId('acme-rule')
    let ruleId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateRule({ input: { name: ruleName } }, { cookie })
      ruleId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a rule', async () => {
        const input: AdminCreateRuleInput = {
          name: uniqueId('rule'),
        }

        const res = await sdk.adminCreateRule({ input }, { cookie })

        const item: Rule = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a rule', async () => {
        const createInput: AdminCreateRuleInput = {
          name: uniqueId('rule'),
        }
        const createdRes = await sdk.adminCreateRule({ input: createInput }, { cookie })
        const ruleId = createdRes.data.created.id
        const input: AdminUpdateRuleInput = {
          name: uniqueId('rule'),
        }

        const res = await sdk.adminUpdateRule({ ruleId, input }, { cookie })

        const item: Rule = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of rules (find all)', async () => {
        const createInput: AdminCreateRuleInput = {
          name: uniqueId('rule'),
        }
        const createdRes = await sdk.adminCreateRule({ input: createInput }, { cookie })
        const ruleId = createdRes.data.created.id

        const input: AdminFindManyRuleInput = {}

        const res = await sdk.adminFindManyRule({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(ruleId)
      })

      it('should find a list of rules (find new one)', async () => {
        const createInput: AdminCreateRuleInput = {
          name: uniqueId('rule'),
        }
        const createdRes = await sdk.adminCreateRule({ input: createInput }, { cookie })
        const ruleId = createdRes.data.created.id

        const input: AdminFindManyRuleInput = {
          search: ruleId,
        }

        const res = await sdk.adminFindManyRule({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(ruleId)
      })

      it('should find a rule by id', async () => {
        const createInput: AdminCreateRuleInput = {
          name: uniqueId('rule'),
        }
        const createdRes = await sdk.adminCreateRule({ input: createInput }, { cookie })
        const ruleId = createdRes.data.created.id

        const res = await sdk.adminFindOneRule({ ruleId }, { cookie })

        expect(res.data.item.id).toBe(ruleId)
      })

      it('should delete a rule', async () => {
        const createInput: AdminCreateRuleInput = {
          name: uniqueId('rule'),
        }
        const createdRes = await sdk.adminCreateRule({ input: createInput }, { cookie })
        const ruleId = createdRes.data.created.id

        const res = await sdk.adminDeleteRule({ ruleId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyRule({ input: { search: ruleId } }, { cookie })
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
        const input: AdminCreateRuleInput = {
          name: uniqueId('rule'),
        }

        try {
          await sdk.adminCreateRule({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a rule', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateRule({ ruleId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of rules (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyRule({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a rule by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneRule({ ruleId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a rule', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteRule({ ruleId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})

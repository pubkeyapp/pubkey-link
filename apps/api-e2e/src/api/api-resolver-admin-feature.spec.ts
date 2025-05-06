import {
  AdminCreateResolverInput,
  AdminFindManyResolverInput,
  AdminUpdateResolverInput,
  Resolver,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-resolver-feature', () => {
  describe('api-resolver-admin-resolver', () => {
    const resolverName = uniqueId('acme-resolver')
    let resolverId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateResolver({ input: { name: resolverName } }, { cookie })
      resolverId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a resolver', async () => {
        const input: AdminCreateResolverInput = {
          name: uniqueId('resolver'),
        }

        const res = await sdk.adminCreateResolver({ input }, { cookie })

        const item: Resolver = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a resolver', async () => {
        const createInput: AdminCreateResolverInput = {
          name: uniqueId('resolver'),
        }
        const createdRes = await sdk.adminCreateResolver({ input: createInput }, { cookie })
        const resolverId = createdRes.data.created.id
        const input: AdminUpdateResolverInput = {
          name: uniqueId('resolver'),
        }

        const res = await sdk.adminUpdateResolver({ resolverId, input }, { cookie })

        const item: Resolver = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of resolvers (find all)', async () => {
        const createInput: AdminCreateResolverInput = {
          name: uniqueId('resolver'),
        }
        const createdRes = await sdk.adminCreateResolver({ input: createInput }, { cookie })
        const resolverId = createdRes.data.created.id

        const input: AdminFindManyResolverInput = {}

        const res = await sdk.adminFindManyResolver({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(resolverId)
      })

      it('should find a list of resolvers (find new one)', async () => {
        const createInput: AdminCreateResolverInput = {
          name: uniqueId('resolver'),
        }
        const createdRes = await sdk.adminCreateResolver({ input: createInput }, { cookie })
        const resolverId = createdRes.data.created.id

        const input: AdminFindManyResolverInput = {
          search: resolverId,
        }

        const res = await sdk.adminFindManyResolver({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(resolverId)
      })

      it('should find a resolver by id', async () => {
        const createInput: AdminCreateResolverInput = {
          name: uniqueId('resolver'),
        }
        const createdRes = await sdk.adminCreateResolver({ input: createInput }, { cookie })
        const resolverId = createdRes.data.created.id

        const res = await sdk.adminFindOneResolver({ resolverId }, { cookie })

        expect(res.data.item.id).toBe(resolverId)
      })

      it('should delete a resolver', async () => {
        const createInput: AdminCreateResolverInput = {
          name: uniqueId('resolver'),
        }
        const createdRes = await sdk.adminCreateResolver({ input: createInput }, { cookie })
        const resolverId = createdRes.data.created.id

        const res = await sdk.adminDeleteResolver({ resolverId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyResolver({ input: { search: resolverId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a resolver', async () => {
        expect.assertions(1)
        const input: AdminCreateResolverInput = {
          name: uniqueId('resolver'),
        }

        try {
          await sdk.adminCreateResolver({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a resolver', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateResolver({ resolverId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of resolvers (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyResolver({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a resolver by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneResolver({ resolverId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a resolver', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteResolver({ resolverId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})

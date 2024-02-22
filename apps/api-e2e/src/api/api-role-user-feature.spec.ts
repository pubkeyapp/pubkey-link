import { Role, UserCreateRoleInput, UserFindManyRoleInput, UserUpdateRoleInput } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

const defaultCommunityId = 'pubkey'

describe('api-role-feature', () => {
  describe('api-role-user-resolver', () => {
    const roleName = uniqueId('acme-role')
    let roleId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.userCreateRole(
        {
          input: {
            communityId: defaultCommunityId,
            name: roleName,
          },
        },
        { cookie },
      )
      roleId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a role', async () => {
        const input: UserCreateRoleInput = {
          communityId: defaultCommunityId,
          name: uniqueId('role'),
        }

        const res = await sdk.userCreateRole({ input }, { cookie })

        const item: Role = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a role', async () => {
        const createInput: UserCreateRoleInput = {
          communityId: defaultCommunityId,
          name: uniqueId('role'),
        }
        const createdRes = await sdk.userCreateRole({ input: createInput }, { cookie })
        const roleId = createdRes.data.created.id
        const input: UserUpdateRoleInput = {
          name: uniqueId('role'),
        }

        const res = await sdk.userUpdateRole({ roleId, input }, { cookie })

        const item: Role = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of roles (find all)', async () => {
        const input: UserFindManyRoleInput = {
          communityId: defaultCommunityId,
        }

        const res = await sdk.userFindManyRole({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
      })

      it('should find a list of roles (find new one)', async () => {
        const createInput: UserCreateRoleInput = {
          communityId: defaultCommunityId,
          name: uniqueId('role'),
        }
        const createdRes = await sdk.userCreateRole({ input: createInput }, { cookie })
        const roleId = createdRes.data.created.id

        const input: UserFindManyRoleInput = {
          communityId: defaultCommunityId,

          search: roleId,
        }

        const res = await sdk.userFindManyRole({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(roleId)
      })

      it('should find a role by id', async () => {
        const createInput: UserCreateRoleInput = {
          communityId: defaultCommunityId,
          name: uniqueId('role'),
        }
        const createdRes = await sdk.userCreateRole({ input: createInput }, { cookie })
        const roleId = createdRes.data.created.id

        const res = await sdk.userFindOneRole({ roleId }, { cookie })

        expect(res.data.item.id).toBe(roleId)
      })

      it('should delete a role', async () => {
        const createInput: UserCreateRoleInput = {
          communityId: defaultCommunityId,
          name: uniqueId('role'),
        }
        const createdRes = await sdk.userCreateRole({ input: createInput }, { cookie })
        const roleId = createdRes.data.created.id

        const res = await sdk.userDeleteRole({ roleId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyRole(
          {
            input: {
              communityId: defaultCommunityId,
              search: roleId,
            },
          },
          { cookie },
        )
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a role', async () => {
        expect.assertions(1)
        const input: UserCreateRoleInput = {
          communityId: defaultCommunityId,
          name: uniqueId('role'),
        }

        try {
          await sdk.userCreateRole({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('User bob is not a member of community pubkey')
        }
      })

      it('should not update a role', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateRole({ roleId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('User bob is not a member of community pubkey')
        }
      })

      it('should not find a list of roles (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindManyRole(
            {
              input: {
                communityId: defaultCommunityId,
              },
            },
            { cookie },
          )
        } catch (e) {
          expect(e.message).toBe('User bob is not a member of community pubkey')
        }
      })

      it('should not find a role by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneRole({ roleId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('User bob is not a member of community pubkey')
        }
      })

      it('should not delete a role', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteRole({ roleId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('User bob is not a member of community pubkey')
        }
      })
    })
  })
})

import {
  CommunityRole,
  IdentityProvider,
  NetworkCluster,
  Team,
  UserCreateTeamInput,
  UserFindManyTeamInput,
  UserUpdateTeamInput,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-team-feature', () => {
  describe('api-team-user-resolver', () => {
    const communityName = uniqueId('acme-community')
    let communityId: string
    let identityId: string
    let alice: string
    let bob: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      bob = await getBobCookie()
      identityId = await sdk
        .me(undefined, { cookie: alice })
        .then((res) => res.data.me?.identities?.find((i) => i.provider === IdentityProvider.Solana)?.id)

      communityId = await sdk
        .userCreateCommunity(
          {
            input: { cluster: NetworkCluster.SolanaCustom, name: communityName },
          },
          { cookie: alice },
        )
        .then((res) => res.data.created.id)
      await sdk.userCreateCommunityMember(
        { communityId, input: { userId: 'dave', role: CommunityRole.Admin } },
        { cookie: alice },
      )
    })

    describe('authorized', () => {
      it('should create a team', async () => {
        const input: UserCreateTeamInput = {
          communityId,
          identityId,
          name: uniqueId('team'),
        }

        const res = await sdk.userCreateTeam({ input }, { cookie: alice })

        const item: Team = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()

        await sdk.userDeleteTeam({ teamId: item.id }, { cookie: alice })
      })

      it('should update a team', async () => {
        const teamId = await sdk
          .userCreateTeam(
            {
              input: {
                communityId,
                identityId,
                name: uniqueId('team'),
              },
            },
            { cookie: alice },
          )
          .then((created) => created.data.created.id)

        const input: UserUpdateTeamInput = {
          name: uniqueId('team'),
        }

        const res = await sdk.userUpdateTeam({ teamId, input }, { cookie: alice })

        const item: Team = res.data.updated
        expect(item.name).toBe(input.name)
        await sdk.userDeleteTeam({ teamId }, { cookie: alice })
      })

      it('should find a list of teams (find all)', async () => {
        const teamId = await sdk
          .userCreateTeam(
            {
              input: {
                communityId,
                identityId,
                name: uniqueId('team'),
              },
            },
            { cookie: alice },
          )
          .then((created) => created.data.created.id)

        const input: UserFindManyTeamInput = { communityId }

        const res = await sdk.userFindManyTeam({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThanOrEqual(1)
        expect(res.data.paging.data.length).toBeGreaterThanOrEqual(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(teamId)
        await sdk.userDeleteTeam({ teamId }, { cookie: alice })
      })

      it('should find a list of teams (find new one)', async () => {
        const teamId = await sdk
          .userCreateTeam(
            {
              input: {
                communityId,
                identityId,
                name: uniqueId('team'),
              },
            },
            { cookie: alice },
          )
          .then((created) => created.data.created.id)

        const input: UserFindManyTeamInput = {
          communityId,
          search: teamId,
        }

        const res = await sdk.userFindManyTeam({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(teamId)
        await sdk.userDeleteTeam({ teamId }, { cookie: alice })
      })

      it('should find a team by id', async () => {
        const teamId = await sdk
          .userCreateTeam(
            {
              input: {
                communityId,
                identityId,
                name: uniqueId('team'),
              },
            },
            { cookie: alice },
          )
          .then((created) => created.data.created.id)

        const res = await sdk.userFindOneTeam({ teamId }, { cookie: alice })

        expect(res.data.item.id).toBe(teamId)
        await sdk.userDeleteTeam({ teamId }, { cookie: alice })
      })

      it('should delete a team', async () => {
        const teamId = await sdk
          .userCreateTeam(
            {
              input: {
                communityId,
                identityId,
                name: uniqueId('team'),
              },
            },
            { cookie: alice },
          )
          .then((created) => created.data.created.id)

        const res = await sdk.userDeleteTeam({ teamId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyTeam({ input: { communityId, search: teamId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })

      it('should add and remove members from a team', async () => {
        const team = await sdk
          .userCreateTeam(
            {
              input: {
                communityId,
                identityId,
                name: uniqueId('team'),
              },
            },
            { cookie: alice },
          )
          .then((created) => created.data.created)

        const teamAfterCreate = await sdk
          .userFindOneTeam({ teamId: team.id }, { cookie: alice })
          .then((res) => res.data.item)
        expect(teamAfterCreate.members?.length).toBe(1)
        const res = await sdk.userAddTeamMember({ teamId: team.id, userId: 'dave' }, { cookie: alice })
        expect(res.data.added).toBe(true)

        const teamAfterAdd = await sdk.userFindOneTeam({ teamId: team.id }, { cookie: alice })
        expect(teamAfterAdd.data.item.members.length).toBe(2)

        await sdk.userRemoveTeamMember({ teamId: team.id, userId: 'dave' }, { cookie: alice })

        const teamAfterRemove = await sdk.userFindOneTeam({ teamId: team.id }, { cookie: alice })
        expect(teamAfterRemove.data.item.members.length).toBe(1)

        await sdk.userDeleteTeam({ teamId: team.id }, { cookie: alice })
      })
    })

    describe('unauthorized', () => {
      let teamId: string

      beforeAll(async () => {
        teamId = await sdk
          .userCreateTeam({ input: { name: uniqueId('team'), communityId, identityId } }, { cookie: alice })
          .then((created) => created.data.created.id)
      })
      it('should not create a team', async () => {
        expect.assertions(1)
        const input: UserCreateTeamInput = {
          communityId,
          identityId,
          name: uniqueId('team'),
        }

        try {
          await sdk.userCreateTeam({ input }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe(`User bob is not a member of community ${communityId}`)
        }
      })

      it('should not update a team', async () => {
        expect.assertions(1)
        try {
          await sdk.userUpdateTeam({ teamId, input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('You are not the owner of this team')
        }
      })

      it('should not find a list of teams (find all)', async () => {
        expect.assertions(1)
        try {
          const res = await sdk.userFindManyTeam({ input: { communityId } }, { cookie: bob })
          console.log('res', res)
        } catch (e) {
          expect(e.message).toBe(`User bob is not a member of community ${communityId}`)
        }
      })

      it('should not find a team by id', async () => {
        expect.assertions(1)
        try {
          await sdk.userFindOneTeam({ teamId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Team not found')
        }
      })

      it('should not delete a team', async () => {
        expect.assertions(1)
        try {
          await sdk.userDeleteTeam({ teamId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('You are not the owner of this team')
        }
      })

      it('should not add a member to a team that is not in the community', async () => {
        expect.assertions(4)

        const teamAfterCreate = await sdk.userFindOneTeam({ teamId }, { cookie: alice }).then((res) => res.data.item)
        expect(teamAfterCreate.members?.length).toBe(1)

        try {
          const x = await sdk.userAddTeamMember({ teamId, userId: 'bob' }, { cookie: alice })
          console.log('x', x)
        } catch (e) {
          expect(e.message).toBe(`User bob is not a member of community ${communityId}`)
        }

        try {
          await sdk.userRemoveTeamMember({ teamId, userId: 'bob' }, { cookie: alice })
        } catch (e) {
          expect(e.message).toBe('User is not a member of this team')
        }

        const teamAfterRemove = await sdk.userFindOneTeam({ teamId }, { cookie: alice })
        expect(teamAfterRemove.data.item.members.length).toBe(1)

        await sdk.userDeleteTeam({ teamId }, { cookie: alice })
      })
    })
  })
})

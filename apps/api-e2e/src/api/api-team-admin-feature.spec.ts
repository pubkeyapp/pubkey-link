import { AdminFindManyTeamInput, AdminUpdateTeamInput, IdentityProvider, NetworkCluster, Team } from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-team-feature', () => {
  describe('api-team-admin-resolver', () => {
    const communityName = uniqueId('acme-community')
    const teamName = uniqueId('acme-team')
    let teamId: string
    let communityId: string
    let alice: string
    let bob: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      bob = await getBobCookie()
      const identityId = await sdk
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
      const created = await sdk.userCreateTeam(
        { input: { name: teamName, communityId, identityId } },
        { cookie: alice },
      )
      teamId = created.data.created.id
    })

    describe('authorized', () => {
      it('should update a team', async () => {
        const input: AdminUpdateTeamInput = {
          name: uniqueId('team'),
        }

        const res = await sdk.adminUpdateTeam({ teamId, input }, { cookie: alice })

        const item: Team = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of teams (find all)', async () => {
        const input: AdminFindManyTeamInput = { communityId }

        const res = await sdk.adminFindManyTeam({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThanOrEqual(1)
        expect(res.data.paging.data.length).toBeGreaterThanOrEqual(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(teamId)
      })

      it('should find a list of teams (find new one)', async () => {
        const input: AdminFindManyTeamInput = { communityId, search: teamId }

        const res = await sdk.adminFindManyTeam({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(teamId)
      })

      it('should find a team by id', async () => {
        const res = await sdk.adminFindOneTeam({ teamId }, { cookie: alice })

        expect(res.data.item.id).toBe(teamId)
      })

      it('should delete a team', async () => {
        const res = await sdk.adminDeleteTeam({ teamId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyTeam({ input: { communityId, search: teamId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      it('should not update a team', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateTeam({ teamId, input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of teams (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyTeam({ input: { communityId } }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a team by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneTeam({ teamId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a team', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteTeam({ teamId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})

import { CommunityRoleMap } from '../entity/discord-server.entity'
import { CommunityMemberRole, compareCommunityDiscordRoles, DiscordMemberRole } from './compare-community-discord-roles'

describe('compare-community-discord-roles', () => {
  it('should work with empty data', () => {
    const communityRoleMap: CommunityRoleMap = {}
    const communityMemberRoles: CommunityMemberRole[] = []
    const discordMemberRoles: DiscordMemberRole[] = []

    const result = compareCommunityDiscordRoles({ communityRoleMap, communityMemberRoles, discordMemberRoles })

    expect(Object.keys(result)).toEqual(['addRolesToMember', 'removeRolesFromMember'])
    expect(result.addRolesToMember).toMatchInlineSnapshot(`{}`)
    expect(result.removeRolesFromMember).toMatchInlineSnapshot(`{}`)
  })

  it('should work with roles that are in sync', () => {
    const communityAdminRoleDiscordId = 'community-admins-discord'
    const communityAdminRoleDatabaseId = 'community-admins-database'
    const communityLeaderRoleDiscordId = 'community-leaders-discord'
    const communityLeaderRoleDatabaseId = 'community-leaders-database'
    const communityMemberRoleDiscordId = 'community-members-discord'
    const communityMemberRoleDatabaseId = 'community-members-database'
    const communityUserAdmin = 'community-user-admin'
    const communityUserLeader = 'community-user-leader'
    const communityUserMember = 'community-user-member'

    // The roles that are managed in our community
    const communityRoleMap: CommunityRoleMap = {
      [communityAdminRoleDatabaseId]: [communityAdminRoleDiscordId],
      [communityLeaderRoleDatabaseId]: [communityLeaderRoleDiscordId],
      [communityMemberRoleDatabaseId]: [communityMemberRoleDiscordId],
    }

    // The members with their roles as decided by the community
    const communityMemberRoles: CommunityMemberRole[] = [
      {
        discordId: communityUserAdmin,
        roleIds: [communityAdminRoleDatabaseId, communityLeaderRoleDatabaseId, communityMemberRoleDatabaseId],
      },
      {
        discordId: communityUserLeader,
        roleIds: [communityLeaderRoleDatabaseId, communityMemberRoleDatabaseId],
      },
      {
        discordId: communityUserMember,
        roleIds: [communityMemberRoleDatabaseId],
      },
    ]

    // The members with their actual roles in Discord
    const discordMemberRoles: DiscordMemberRole[] = [
      {
        discordId: communityUserAdmin,
        roleIds: [
          communityAdminRoleDiscordId,
          communityLeaderRoleDiscordId,
          communityMemberRoleDiscordId,
          'unmanaged-role-1',
          'unmanaged-role-2',
        ],
      },
      {
        discordId: communityUserLeader,
        roleIds: [communityLeaderRoleDiscordId, communityMemberRoleDiscordId, 'unmanaged-role-3', 'unmanaged-role-4'],
      },
      {
        discordId: communityUserMember,
        roleIds: [communityMemberRoleDiscordId, 'unmanaged-role-5', 'unmanaged-role-6'],
      },
      {
        discordId: 'some-totally-unrelated-user',
        roleIds: ['some-totally-unrelated-role'],
      },
    ]

    // This method figures out which roles need to be added and which need to be removed based on the community roles
    const result = compareCommunityDiscordRoles({ communityRoleMap, communityMemberRoles, discordMemberRoles })

    expect(Object.keys(result)).toEqual(['addRolesToMember', 'removeRolesFromMember'])

    // No need to add any roles to members
    expect(result.addRolesToMember).toMatchInlineSnapshot(`{}`)
    expect(Object.keys(result.addRolesToMember).length).toBe(0)

    // No need to remove any roles from members
    expect(result.removeRolesFromMember).toMatchInlineSnapshot(`{}`)
    expect(Object.keys(result.removeRolesFromMember).length).toBe(0)
  })

  it('should work with roles that need to be added and removed', () => {
    const communityAdminRoleDiscordId = 'community-admins-discord'
    const communityAdminRoleDatabaseId = 'community-admins-database'
    const communityLeaderRoleDiscordId = 'community-leaders-discord'
    const communityLeaderRoleDatabaseId = 'community-leaders-database'
    const communityMemberRoleDiscordId = 'community-members-discord'
    const communityMemberRoleDatabaseId = 'community-members-database'
    const communityUserAdmin = 'community-user-admin'
    const communityUserLeader = 'community-user-leader'
    const communityUserMember = 'community-user-member'

    // The roles that are managed in our community
    const communityRoleMap: CommunityRoleMap = {
      [communityAdminRoleDatabaseId]: [communityAdminRoleDiscordId],
      [communityLeaderRoleDatabaseId]: [communityLeaderRoleDiscordId],
      [communityMemberRoleDatabaseId]: [communityMemberRoleDiscordId],
    }

    // The members with their roles as decided by the community
    const communityMemberRoles: CommunityMemberRole[] = [
      {
        discordId: communityUserAdmin,
        roleIds: [communityAdminRoleDatabaseId, communityLeaderRoleDatabaseId, communityMemberRoleDatabaseId],
      },
      {
        discordId: communityUserLeader,
        roleIds: [communityLeaderRoleDatabaseId, communityMemberRoleDatabaseId],
      },
      {
        discordId: communityUserMember,
        roleIds: [communityMemberRoleDatabaseId],
      },
      {
        discordId: 'community-member-not-in-server',
        roleIds: [communityMemberRoleDatabaseId],
      },
    ]

    // The members with their actual roles in Discord
    const discordMemberRoles: DiscordMemberRole[] = [
      {
        discordId: communityUserAdmin,
        roleIds: [communityAdminRoleDiscordId, 'unmanaged-role-1', 'unmanaged-role-2'],
      },
      {
        discordId: communityUserLeader,
        roleIds: [communityLeaderRoleDiscordId, 'unmanaged-role-3', 'unmanaged-role-4'],
      },
      {
        discordId: communityUserMember,
        roleIds: [
          // This user is missing the community member role according to the community
          communityLeaderRoleDiscordId, // This should be removed according to the community
          'unmanaged-role-5',
          'unmanaged-role-6',
        ],
      },
      // Some users that are not in the community but have managed roles
      { discordId: 'some-unknown-admin', roleIds: [communityAdminRoleDiscordId] },
      { discordId: 'some-unknown-leader', roleIds: [communityLeaderRoleDiscordId] },
      { discordId: 'some-unknown-member', roleIds: [communityMemberRoleDiscordId] },
      // We don't know the user, we don't manage their roles
      {
        discordId: 'some-totally-unrelated-user',
        roleIds: ['some-totally-unrelated-role'],
      },
    ]

    // This method figures out which roles need to be added and which need to be removed based on the community roles
    const result = compareCommunityDiscordRoles({ communityRoleMap, communityMemberRoles, discordMemberRoles })

    expect(Object.keys(result)).toEqual(['addRolesToMember', 'removeRolesFromMember'])

    // Adding roles to members
    expect(result.addRolesToMember[communityUserAdmin]).toEqual([
      communityLeaderRoleDiscordId,
      communityMemberRoleDiscordId,
    ])
    expect(result.addRolesToMember[communityUserLeader]).toEqual([communityMemberRoleDiscordId])
    expect(result.addRolesToMember[communityUserMember]).toEqual([communityMemberRoleDiscordId])

    // Removing roles from members
    expect(result.removeRolesFromMember[communityUserMember]).toEqual([communityLeaderRoleDiscordId])
    expect(result.removeRolesFromMember['some-unknown-admin']).toEqual([communityAdminRoleDiscordId])
    expect(result.removeRolesFromMember['some-unknown-leader']).toEqual([communityLeaderRoleDiscordId])
    expect(result.removeRolesFromMember['some-unknown-member']).toEqual([communityMemberRoleDiscordId])

    // expect(result.removeRolesFromMember['member-in-community']).toEqual([communityMemberRoleId])
    expect(result.addRolesToMember).toMatchInlineSnapshot(`
      {
        "community-user-admin": [
          "community-leaders-discord",
          "community-members-discord",
        ],
        "community-user-leader": [
          "community-members-discord",
        ],
        "community-user-member": [
          "community-members-discord",
        ],
      }
    `)
    expect(result.removeRolesFromMember).toMatchInlineSnapshot(`
      {
        "community-user-member": [
          "community-leaders-discord",
        ],
        "some-unknown-admin": [
          "community-admins-discord",
        ],
        "some-unknown-leader": [
          "community-leaders-discord",
        ],
        "some-unknown-member": [
          "community-members-discord",
        ],
      }
    `)
  })
})

import { CommunityRoleMap } from '../entity/discord-server.entity'

export type CommunityMemberRoleMap = Record<string, string[]>

export interface CompareBotServerRolesResult {
  // Users that the bot knows about and are in the community, don't have a role that they should have
  addRolesToMember: CommunityMemberRoleMap
  // Users that the bot knows about and are in the community, but have a role that they should not have
  removeRolesFromMember: CommunityMemberRoleMap
}

// Describe the Community Member with their Discord ID and the Discord Roles they should have
export interface CommunityMemberRole {
  discordId: string
  roleIds: string[]
}

// Describe the Discord Member with their Discord ID and the Discord Roles they actually have
export interface DiscordMemberRole {
  discordId: string
  roleIds: string[]
}

/**
 * Compare the roles in the community with the roles in Discord
 * @param communityRoleMap
 * @param communityMemberRoles
 * @param discordMemberRoles
 */
export function compareCommunityDiscordRoles({
  communityRoleMap,
  communityMemberRoles,
  discordMemberRoles,
}: {
  communityRoleMap: CommunityRoleMap
  communityMemberRoles: CommunityMemberRole[]
  discordMemberRoles: DiscordMemberRole[]
}): CompareBotServerRolesResult {
  // Get all the unique role IDs from communityRolePermissions.
  const managedRoleIds: string[] = getManagedRoleIds(communityRoleMap)

  const addRolesToMember: CommunityMemberRoleMap = {}
  const removeRolesFromMember: CommunityMemberRoleMap = {}

  // Verify if the roles in the community are applied to the members in Discord
  for (const { discordId, roleIds: unmappedCommunityRoleIds } of communityMemberRoles) {
    // Find the user in Discord
    const communityRoleIds = unmappedCommunityRoleIds
      .map((roleId) => communityRoleMap[roleId])
      .filter(Boolean)
      .flat()

    // Find the user in Discord
    const discordMember = findDiscordMember(discordMemberRoles, discordId)

    if (!discordMember) {
      // The user is not in Discord, we don't need to do anything
      continue
    }

    // The user is in Discord, so we need to check if they have the correct roles

    // These are the roles that the user has in Discord that are managed by the community
    const discordMemberRoleIds = discordMember.roleIds.filter((roleId) => managedRoleIds.includes(roleId))

    // These are the roles that the user has in the community that are not in Discord
    const missingRoleIds = communityRoleIds.filter((roleId) => !discordMemberRoleIds.includes(roleId))

    // These are the roles that the user has in Discord that are not in the community
    const extraRoleIds = discordMemberRoleIds.filter((roleId) => !communityRoleIds.includes(roleId))

    if (extraRoleIds.length) {
      // The user has roles that are in Discord but not in the community, so we need to add them
      removeRolesFromMember[discordId] = extraRoleIds
    }

    if (missingRoleIds.length) {
      // The user has roles that are not in the community, so we need to remove them
      addRolesToMember[discordId] = missingRoleIds
    }
  }

  // Members who are in Discord, but are not in the Community
  for (const { discordId, roleIds } of discordMemberRoles) {
    // Find the user in the community
    const communityMember = findCommunityMember(communityMemberRoles, discordId)

    if (communityMember) {
      // This member is in the community, so it's checked with the logic above
      continue
    }

    const removeRoleIds = roleIds.filter((roleId) => managedRoleIds.includes(roleId))

    if (removeRoleIds.length) {
      // The user is not in the community, so we need to remove them from the list of users to remove roles from
      removeRolesFromMember[discordId] = roleIds.filter((roleId) => managedRoleIds.includes(roleId))
    }
  }

  return {
    addRolesToMember,
    removeRolesFromMember,
  }
}

/**
 * Get the managed role IDs from the communityRoleMap
 *
 * Managed roles are the ones that are managed by the community.
 * @param roleMap Map of community role IDs to an array of discord role IDs
 */
function getManagedRoleIds(roleMap: CommunityRoleMap) {
  return Array.from(new Set(Object.values(roleMap).flatMap((roleIds) => roleIds)))
}

/**
 * Get the managed role IDs from the Community Member Roles
 * @param members The members to search through
 * @param discordId The discord ID to search for
 */
function findCommunityMember(members: CommunityMemberRole[], discordId: string) {
  return members.find((m) => m.discordId === discordId)
}

/**
 * Get the managed role IDs from the Discord Member Roles
 * @param members The members to search through
 * @param discordId The discord ID to search for
 */
function findDiscordMember(members: DiscordMemberRole[], discordId: string) {
  return members.find((m) => m.discordId === discordId)
}

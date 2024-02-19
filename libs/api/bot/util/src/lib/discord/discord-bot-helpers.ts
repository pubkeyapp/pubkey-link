export interface FormatBotMessageOptions {
  communityMember: { username: string; discordId?: string }
  prefix: string
  dryRun: boolean
  mentionRoles: boolean
  mentionUsers: boolean
  roles: string[]
  roleMap: Record<string, string>
}

export function formatBotMessage({
  communityMember: { username, discordId },
  prefix,
  dryRun,
  mentionRoles,
  mentionUsers,
  roles,
  roleMap,
}: FormatBotMessageOptions) {
  const user = mentionUsers ? `<@${discordId}>` : `**${username}**`
  function role(name: string) {
    return mentionRoles ? `<@&${name}>` : `**${roleMap[name]}**`
  }

  return {
    botMessage: `${dryRunBot(dryRun)} ${prefix} ${user}: ${roles.map(role).join(', ')}`,
    logMessage: `${dryRunLog(dryRun)} ${prefix} ${username}: ${roles.map((r) => roleMap[r]).join(', ')}`,
  }
}

export function formatBotMessageRemove(props: Omit<FormatBotMessageOptions, 'prefix'>) {
  return formatBotMessage({
    ...props,
    prefix: props.roles.length > 1 ? '😭 Removed roles from' : '😭 Removed role from',
  })
}

export function formatBotMessageAdd(props: Omit<FormatBotMessageOptions, 'prefix'>) {
  return formatBotMessage({
    ...props,
    prefix: props.roles.length > 1 ? '🥳 Added roles to' : '🥳 Added role to',
  })
}

function dryRunBot(dryRun: boolean) {
  return dryRun ? `**${dryRunLog(dryRun)}**` : ''
}
function dryRunLog(dryRun: boolean) {
  return dryRun ? '[DRY RUN]' : ''
}

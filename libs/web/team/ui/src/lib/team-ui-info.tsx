import { Team } from '@pubkey-link/sdk'
import { IdentityUiItem } from '@pubkey-link/web-identity-ui'
import { UserUiItem } from '@pubkey-link/web-user-ui'
import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'

export function TeamUiInfo({ team }: { team?: Team }) {
  if (!team) return null

  const items: UiInfoItems = [
    ['Identity', team.identity ? <IdentityUiItem identity={team.identity} /> : 'N/A'],
    [
      'Identity Owner',
      team.identity?.owner ? <UserUiItem user={team.identity.owner} to={team.identity.owner.profileUrl} /> : 'N/A',
    ],
    ['Members', `${team.members?.length} members`],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(team.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(team.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}

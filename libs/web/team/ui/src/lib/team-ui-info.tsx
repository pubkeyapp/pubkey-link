import { Team } from '@pubkey-link/sdk'
import { UserUiItem } from '@pubkey-link/web-user-ui'
import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'

export function TeamUiInfo({ team }: { team?: Team }) {
  if (!team) return null

  const items: UiInfoItems = [
    [
      'Owned by',
      team.owner ? (
        <UserUiItem avatarProps={{ size: 'sm' }} groupProps={{ gap: 8 }} user={team.owner} to={team.owner.profileUrl}>
          <div />
        </UserUiItem>
      ) : (
        'N/A'
      ),
    ],
    ['Members', `${team.members?.length} members`],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(team.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(team.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}

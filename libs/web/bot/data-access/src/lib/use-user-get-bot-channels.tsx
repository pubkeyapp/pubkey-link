import { ComboboxItemGroup } from '@mantine/core/lib/components/Combobox/Combobox.types'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserGetBotChannels({ botId, serverId }: { botId: string; serverId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'get-bot-channels', { botId, serverId }],
    queryFn: () => sdk.userGetBotChannels({ botId, serverId }).then((res) => res.data),
  })

  const channels = query.data?.items || []

  const channelOptions: ComboboxItemGroup[] = channels
    .filter((channel) => channel.type === 'GuildCategory')
    .reduce(
      (acc, group) => {
        return [
          ...acc,
          {
            group: group.name,
            items: channels
              .filter((channel) => channel.parentId === group.id)
              .map((channel) => ({
                value: channel.id,
                label: channel.name,
              })),
          },
        ].filter((group) => group.items.length)
      },
      [
        {
          group: 'Top Level',
          items: channels
            .filter((channel) => channel.type !== 'GuildCategory' && !channel.parentId)
            .map((channel) => ({
              value: channel.id,
              label: channel.name,
            })),
        },
      ] as ComboboxItemGroup[],
    )

  return {
    query,
    channelOptions,
  }
}

import { Button, Checkbox, ComboboxItem, Group } from '@mantine/core'
import { ComboboxItemGroup } from '@mantine/core/lib/components/Combobox/Combobox.types'
import { useForm } from '@mantine/form'
import { BotServer, UserUpdateBotServerInput } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { DiscordUiChannelSelect } from './discord-ui-channel-select'
import { DiscordUiRoleSelect } from './discord-ui-role-select'

export function UserBotServerUiUpdateForm({
  children,
  submit,
  botServer,
  roles = [],
  channels = [],
}: {
  children: ReactNode
  submit: (res: UserUpdateBotServerInput) => Promise<boolean>
  botServer: BotServer
  roles: ComboboxItem[]
  channels: ComboboxItemGroup[]
}) {
  const form = useForm<UserUpdateBotServerInput>({
    initialValues: {
      adminRoles: botServer.adminRoles,
      botChannel: botServer.botChannel,
      dryRun: botServer.dryRun ?? false,
      enableSync: botServer.enableSync ?? false,
      mentionRoles: botServer.mentionRoles ?? false,
      mentionUsers: botServer.mentionUsers ?? false,
      verbose: botServer.verbose ?? false,
    },
    validate: {
      //
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <DiscordUiRoleSelect
          label="Admin Roles"
          description="The selected roles will get Community Admin permissions."
          roles={roles}
          {...form.getInputProps('adminRoles')}
        />
        <DiscordUiChannelSelect
          label="Bot Channel"
          description="The channel where the bot will send log events."
          data={channels}
          {...form.getInputProps('botChannel')}
        />
        <Checkbox
          label="Dry Run"
          description="If enabled, the bot will not perform any actions, only log what it would do."
          {...form.getInputProps('dryRun', { type: 'checkbox' })}
        />
        <Checkbox
          label="Enable Sync"
          description="If enabled, the server will sync its state with the bot."
          {...form.getInputProps('enableSync', { type: 'checkbox' })}
        />
        <Checkbox
          label="Mention Roles"
          description="If enabled, the server will mention roles in the command channel."
          {...form.getInputProps('mentionRoles', { type: 'checkbox' })}
        />
        <Checkbox
          label="Mention Users"
          description="If enabled, the server will mention users in the command channel."
          {...form.getInputProps('mentionUsers', { type: 'checkbox' })}
        />
        <Checkbox
          label="Verbose"
          description="If enabled, the bot will log all actions it performs."
          {...form.getInputProps('verbose', { type: 'checkbox' })}
        />
        <Group justify="right">
          {children}
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}

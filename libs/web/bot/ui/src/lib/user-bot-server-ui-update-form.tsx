import { Button, Checkbox, ComboboxItem, Group } from '@mantine/core'
import { ComboboxItemGroup } from '@mantine/core/lib/components/Combobox/Combobox.types'
import { useForm } from '@mantine/form'
import { BotServer, UserUpdateBotServerInput } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { DiscordUiChannelSelect } from './discord-ui-channel-select'
import { DiscordUiRoleSelect } from './discord-ui-role-select'

export interface GroupedOption {
  group: string
  data: { value: string; label: string }[]
}
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
      adminRole: botServer.adminRole,
      commandChannel: botServer.commandChannel,
      dryRun: botServer.dryRun ?? false,
      enableSync: botServer.enableSync ?? false,
      verbose: botServer.verbose ?? false,
    },
    validate: {
      //
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        return submit(values)
      })}
    >
      <UiStack>
        <DiscordUiRoleSelect
          label="Admin Role"
          description="The role that a user must have to be able to manage the bot"
          roles={roles}
          {...form.getInputProps('adminRole')}
        />
        <DiscordUiChannelSelect
          label="Command Channel"
          description="The channel where the bot will listen for commands and log events."
          data={channels}
          {...form.getInputProps('commandChannel')}
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

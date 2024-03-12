import { Button, Group } from '@mantine/core'
import { Team, UserUpdateTeamInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserTeamUiUpdateForm({
  submit,
  team,
}: {
  submit: (res: UserUpdateTeamInput) => Promise<boolean>
  team: Team
}) {
  const model: UserUpdateTeamInput = {
    name: team.name ?? '',
    avatarUrl: team.avatarUrl ?? '',
  }

  const fields: UiFormField<UserUpdateTeamInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateTeamInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}

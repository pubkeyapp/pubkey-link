import { Button, Group } from '@mantine/core'
import { AdminUpdateTeamInput, Team } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminTeamUiUpdateForm({
  submit,
  team,
}: {
  submit: (res: AdminUpdateTeamInput) => Promise<boolean>
  team: Team
}) {
  const model: AdminUpdateTeamInput = {
    avatarUrl: team.avatarUrl ?? '',
    name: team.name ?? '',
  }

  const fields: UiFormField<AdminUpdateTeamInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateTeamInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}

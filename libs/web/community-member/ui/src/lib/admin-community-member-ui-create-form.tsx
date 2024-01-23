import { Button, Group } from '@mantine/core'
import { AdminCreateCommunityMemberInput, CommunityRole, getEnumOptions } from '@pubkey-link/sdk'
import { formFieldSelect, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminCommunityMemberUiCreateForm({
  submit,
}: {
  submit: (res: AdminCreateCommunityMemberInput) => Promise<boolean>
}) {
  const model: AdminCreateCommunityMemberInput = {
    role: CommunityRole.Member,
    communityId: '',
    userId: '',
  }

  const fields: UiFormField<AdminCreateCommunityMemberInput>[] = [
    formFieldSelect('role', { label: 'Role', options: getEnumOptions(CommunityRole), required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateCommunityMemberInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}

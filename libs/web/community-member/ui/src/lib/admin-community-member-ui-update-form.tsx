import { Button, Group } from '@mantine/core'
import { AdminUpdateCommunityMemberInput, CommunityMember, CommunityRole, getEnumOptions } from '@pubkey-link/sdk'
import { formFieldSelect, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminCommunityMemberUiUpdateForm({
  submit,
  communityMember,
}: {
  submit: (res: AdminUpdateCommunityMemberInput) => Promise<boolean>
  communityMember: CommunityMember
}) {
  const model: AdminUpdateCommunityMemberInput = {
    role: communityMember.role,
  }

  const fields: UiFormField<AdminUpdateCommunityMemberInput>[] = [
    formFieldSelect('role', { label: 'Role', options: getEnumOptions(CommunityRole) }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateCommunityMemberInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}

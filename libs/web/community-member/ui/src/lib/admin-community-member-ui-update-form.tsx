import { Button, Group } from '@mantine/core'
import { AdminUpdateCommunityMemberInput, CommunityMember } from '@pubkey-link/sdk'
import { formFieldCheckbox, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminCommunityMemberUiUpdateForm({
  submit,
  communityMember,
}: {
  submit: (res: AdminUpdateCommunityMemberInput) => Promise<boolean>
  communityMember: CommunityMember
}) {
  const model: AdminUpdateCommunityMemberInput = {
    admin: communityMember.admin,
  }

  const fields: UiFormField<AdminUpdateCommunityMemberInput>[] = [
    formFieldCheckbox('admin', {
      label: 'Admin',
      description: 'This member is an admin of the community.',
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateCommunityMemberInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}

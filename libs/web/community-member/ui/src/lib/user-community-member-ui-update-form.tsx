import { Button, Group } from '@mantine/core'
import { CommunityMember, UserUpdateCommunityMemberInput } from '@pubkey-link/sdk'
import { formFieldCheckbox, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserCommunityMemberUiUpdateForm({
  submit,
  communityMember,
}: {
  submit: (res: UserUpdateCommunityMemberInput) => Promise<boolean>
  communityMember: CommunityMember
}) {
  const model: UserUpdateCommunityMemberInput = {
    admin: communityMember.admin,
  }

  const fields: UiFormField<UserUpdateCommunityMemberInput>[] = [
    formFieldCheckbox('admin', {
      label: 'Admin',
      description: 'This member is an admin of the community.',
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateCommunityMemberInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}

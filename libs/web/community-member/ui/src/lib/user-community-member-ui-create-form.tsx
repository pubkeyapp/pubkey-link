import { Button, Group } from '@mantine/core'
import { CommunityRole, getEnumOptions, UserCreateCommunityMemberInput } from '@pubkey-link/sdk'
import { formFieldSelect, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserCommunityMemberUiCreateForm({
  submit,
}: {
  submit: (res: UserCreateCommunityMemberInput) => Promise<boolean>
}) {
  const model: UserCreateCommunityMemberInput = {
    role: CommunityRole.Member,
    communityId: '',
    userId: '',
  }

  const fields: UiFormField<UserCreateCommunityMemberInput>[] = [
    formFieldSelect('role', { label: 'Role', options: getEnumOptions(CommunityRole) }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserCreateCommunityMemberInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}

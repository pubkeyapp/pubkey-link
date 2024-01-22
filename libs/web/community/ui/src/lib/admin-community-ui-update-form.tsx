import { Button, Group } from '@mantine/core'
import { AdminUpdateCommunityInput, Community } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminCommunityUiUpdateForm({
  submit,
  community,
}: {
  submit: (res: AdminUpdateCommunityInput) => Promise<boolean>
  community: Community
}) {
  const model: AdminUpdateCommunityInput = {
    name: community.name ?? '',
    avatarUrl: community.avatarUrl ?? '',
    description: community.description ?? '',
    websiteUrl: community.websiteUrl ?? '',
    discordUrl: community.discordUrl ?? '',
    githubUrl: community.githubUrl ?? '',
    twitterUrl: community.twitterUrl ?? '',
    telegramUrl: community.telegramUrl ?? '',
  }

  const fields: UiFormField<AdminUpdateCommunityInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('description', { label: 'Description' }),
    formFieldText('avatarUrl', { label: 'Avatar Url' }),
    formFieldText('websiteUrl', { label: 'Website Url' }),
    formFieldText('discordUrl', { label: 'Discord Url' }),
    formFieldText('githubUrl', { label: 'Github Url' }),
    formFieldText('twitterUrl', { label: 'Twitter Url' }),
    formFieldText('telegramUrl', { label: 'Telegram Url' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateCommunityInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}

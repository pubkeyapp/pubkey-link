import { Button, Group } from '@mantine/core'
import { AdminUpdateCommunityInput, Community } from '@pubkey-link/sdk'
import { formFieldCheckbox, formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminCommunityUiUpdateForm({
  submit,
  community,
}: {
  submit: (res: AdminUpdateCommunityInput) => Promise<boolean>
  community: Community
}) {
  const model: AdminUpdateCommunityInput = {
    name: community.name ?? '',
    featured: community.featured ?? false,
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
    formFieldCheckbox('enableSync', {
      label: 'Enable Sync',
      description: 'If enabled, the community roles are synced based on the users assets.',
    }),
    formFieldCheckbox('featured', {
      label: 'Featured',
      description: 'If enabled, the community will show up in the featured section',
    }),
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

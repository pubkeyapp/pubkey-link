import { Group } from '@mantine/core'
import { useAdminFindOneResolver } from '@pubkey-link/web-resolver-data-access'
import { AdminResolverUiUpdateForm, ResolverUiItem } from '@pubkey-link/web-resolver-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'

export function AdminResolverDetailFeature() {
  const { resolverId } = useParams<{ resolverId: string }>() as { resolverId: string }
  const { item, query, updateResolver } = useAdminFindOneResolver({ resolverId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Resolver not found." />
  }

  return (
    <UiPage
      title={<ResolverUiItem resolver={item} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <AdminResolverUiUpdateForm resolver={item} submit={updateResolver} />
    </UiPage>
  )
}

import { UiBack, UiPage } from '@pubkey-ui/core'
import { useRoutes } from 'react-router-dom'
import { AdminVerifyIndexFeature } from './admin-verify-index-feature'

export default function AdminVerifyRoutes() {
  const routes = useRoutes([{ path: '', element: <AdminVerifyIndexFeature /> }])

  return (
    <UiPage title="Verify" leftAction={<UiBack />}>
      {routes}
    </UiPage>
  )
}

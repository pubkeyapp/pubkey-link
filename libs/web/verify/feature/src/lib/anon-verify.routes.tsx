import { useRoutes } from 'react-router-dom'
import { VerifyUiLayout } from '@pubkey-link/web-verify-ui'
import { AnonVerifyIndexFeature } from './anon-verify-index.feature'

export default function AnonVerifyRoutes() {
  const routes = useRoutes([
    //
    { path: '', element: <AnonVerifyIndexFeature /> },
  ])

  return <VerifyUiLayout>{routes}</VerifyUiLayout>
}

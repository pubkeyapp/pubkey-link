import { useRoutes } from 'react-router-dom'
import { AdminCacheConfigFeature } from './admin-cache-config-feature'
import { AdminCacheDetailFeature } from './admin-cache-detail-feature'
import { AdminCacheStatusFeature } from './admin-cache-status-feature'

export default function AdminCacheFeature() {
  return useRoutes([
    { index: true, element: <AdminCacheStatusFeature /> },
    { path: 'config', element: <AdminCacheConfigFeature /> },
    { path: ':cluster/:cacheId', element: <AdminCacheDetailFeature /> },
  ])
}

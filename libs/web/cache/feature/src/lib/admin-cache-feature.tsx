import { useRoutes } from 'react-router-dom'
import { AdminCacheDetailFeature } from './admin-cache-detail-feature'
import { AdminCacheStatusFeature } from './admin-cache-status-feature'

export default function AdminCacheFeature() {
  return useRoutes([
    { index: true, element: <AdminCacheStatusFeature /> },
    { path: ':cluster/:cacheId', element: <AdminCacheDetailFeature /> },
  ])
}

import { useRoutes } from 'react-router-dom'
import { AdminScheduleJobsFeature } from './admin-schedule-jobs-feature'

export default function AdminScheduleFeature() {
  return useRoutes([{ index: true, element: <AdminScheduleJobsFeature /> }])
}

import { Outlet, useRoutes } from 'react-router-dom'
import { OnboardingFeature } from './onboarding-feature'
import { OnboardingLayout } from './onboarding-layout'

export default function () {
  return useRoutes([
    {
      path: '',
      element: (
        <OnboardingLayout>
          <Outlet />
        </OnboardingLayout>
      ),
      children: [{ path: '', element: <OnboardingFeature /> }],
    },
  ])
}

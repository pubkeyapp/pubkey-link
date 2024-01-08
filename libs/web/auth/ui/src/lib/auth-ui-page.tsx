import { Box, Group } from '@mantine/core'
import type { AppConfig } from '@pubkey-link/sdk'
import { UiLogoType, UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { AuthUiEnabled } from './auth-ui-enabled'
import { AuthUiFull } from './auth-ui-full'

export function AuthUiPage({ appConfig, children }: { appConfig: AppConfig; children: ReactNode }) {
  return (
    <AuthUiFull>
      <AuthUiEnabled appConfig={appConfig}>
        <Box miw={400} p="lg">
          <UiStack gap={48}>
            <Group justify="center">
              <UiLogoType height={48} />
            </Group>
            {children}
          </UiStack>
        </Box>
      </AuthUiEnabled>
    </AuthUiFull>
  )
}

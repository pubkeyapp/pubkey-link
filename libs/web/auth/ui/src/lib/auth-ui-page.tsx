import { Flex, Group, Paper, rem, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { CommunityUiFeatured } from '@pubkey-link/web-community-ui'
import { UiBackgroundImage } from '@pubkey-link/web-ui-core'
import { UiLogoType, UiStack, useUiColorScheme } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { AuthUiEnabled } from './auth-ui-enabled'

export function AuthUiPage({ authEnabled, children }: { authEnabled: boolean; children: ReactNode }) {
  const { breakpoints } = useMantineTheme()
  const isSmall = useMediaQuery(`(max-width: ${breakpoints.sm}`)
  const { colorScheme } = useUiColorScheme()
  const border = `${rem(1)} solid var(mantine-color-${colorScheme === 'dark' ? 'dark-7' : 'gray-3'})`

  return (
    <UiBackgroundImage>
      <Flex w="100%" h="100%" justify="center" align="center">
        <Paper
          h={isSmall ? '100%' : undefined}
          w={isSmall ? '100%' : rem(550)}
          p="xl"
          bg={colorScheme === 'dark' ? 'dark.9' : undefined}
          style={{ border: isSmall ? undefined : border }}
        >
          <UiStack gap="xl">
            <Group justify="center" mt="xl">
              <UiLogoType height={64} />
            </Group>
            <CommunityUiFeatured />
            <AuthUiEnabled authEnabled={authEnabled}>{children}</AuthUiEnabled>
          </UiStack>
        </Paper>
      </Flex>
    </UiBackgroundImage>
  )
}

import { Anchor, Flex, Group, Paper, rem, Stack, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { CommunityUiFeatured } from '@pubkey-link/web-community-ui'
import { UiBackgroundImage, UiSocialDiscord, UiSocialGithub, UiSocialX } from '@pubkey-link/web-ui-core'
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
      <Flex direction="column" w="100%" h="100%" justify="center" align="center">
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
            <CommunityUiFeatured label="Communities hosted on this instance" />
            <AuthUiEnabled authEnabled={authEnabled}>{children}</AuthUiEnabled>
          </UiStack>
          <Stack align="center" mt="xl">
            <Group justify="center" gap={4}>
              Powered by <Anchor href="https://github.com/pubkeyapp/pubkey-link-next">PubKey Link</Anchor>
            </Group>
            <Group>
              <UiSocialDiscord
                size="lg"
                iconSize={24}
                href="https://discord.gg/XxuZQeDPNf"
                tooltip="Join the PubKey Discord"
              />
              <UiSocialGithub
                size="lg"
                iconSize={24}
                href="https://x.com/pubkeyapp"
                tooltip="Follow pubkeyapp on GitHub"
              />
              <UiSocialX
                size="lg"
                iconSize={24}
                href="https://x.com/PubKeyApp"
                tooltip="Follow PubKeyApp on X (Twitter)"
              />
            </Group>
          </Stack>
        </Paper>
      </Flex>
    </UiBackgroundImage>
  )
}

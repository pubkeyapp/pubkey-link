import { Flex, Paper, rem, Stack, Text, Title, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IdentityProvider } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { IdentityUiLinkButton } from '@pubkey-link/web-identity-ui'
import { UiStack, useUiColorScheme } from '@pubkey-ui/core'
import { Navigate, useNavigate } from 'react-router-dom'

export function OnboardingFeature() {
  const navigate = useNavigate()
  const { user, appConfig, refresh, hasSolana } = useAuth()
  const { query } = useUserFindManyIdentity({
    provider: IdentityProvider.Solana,
    username: user?.username as string,
  })
  const { breakpoints } = useMantineTheme()
  const isSmall = useMediaQuery(`(max-width: ${breakpoints.sm}`)
  const { colorScheme } = useUiColorScheme()
  const border = `${rem(1)} solid var(mantine-color-${colorScheme === 'dark' ? 'dark-7' : 'gray-3'})`

  if (hasSolana) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <Flex direction="column" w="100%" h="100%" justify="center" align="center">
      <Paper
        h={isSmall ? '100%' : undefined}
        w={isSmall ? '100%' : rem(550)}
        p="xl"
        bg={colorScheme === 'dark' ? 'dark.9' : undefined}
        style={{ border: isSmall ? undefined : border }}
      >
        <UiStack align="center" gap="xl">
          <Stack align="center">
            <Title order={2} c={colorScheme === 'dark' ? 'white' : 'black'} ta="center" my="md">
              You're almost there!
            </Title>
            <Text ta="center">Link your Solana wallet to get started.</Text>
            <Text ta="center">You can add more wallets later.</Text>
          </Stack>
          <IdentityUiLinkButton
            loading={query.isLoading}
            disabled={!appConfig?.authLinkProviders?.includes(IdentityProvider.Solana)}
            identities={[]}
            refresh={() =>
              query
                .refetch()
                .then(() => refresh())
                .then(() => {
                  if (hasSolana) {
                    navigate('/dashboard')
                  }
                })
            }
            provider={IdentityProvider.Solana}
            size="xl"
          />
        </UiStack>
      </Paper>
    </Flex>
  )
}

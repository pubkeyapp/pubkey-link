import { Box, Card, Text } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'

export function IdentityUiSolanaShowCliChallenge({ challenge }: { challenge: string }) {
  const message = `solana sign-offchain-message \\
  ${challenge} \\
  -k ~/path/to/keypair.json`
  return (
    <UiStack>
      <Text>Run the following command to sign the message.</Text>
      <Card withBorder>
        <Box component="pre" my={0} py={0}>
          {message}
        </Box>
      </Card>
    </UiStack>
  )
}

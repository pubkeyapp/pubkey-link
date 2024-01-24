import { ReactNode } from 'react'
import { UiContainer, UiLogoType, UiStack } from '@pubkey-ui/core'
import { Box, Group } from '@mantine/core'

export function VerifyUiLayout({ children }: { children: ReactNode }) {
  return (
    <UiContainer py={128}>
      <Box miw={400} maw={800} mx="auto" p="lg">
        <UiStack gap={48}>
          <Group justify="center">
            <UiLogoType height={48} />
          </Group>
          {children}
        </UiStack>
      </Box>
    </UiContainer>
  )
}

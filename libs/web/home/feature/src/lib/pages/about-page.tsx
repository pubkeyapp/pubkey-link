import { Button, Container, Group, Text, Title } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { IconHome } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <Container size={700}>
      <UiStack gap="xl" my="xl">
        <Title>About PubKey Link.</Title>
        <Text c="dimmed">This is an empty about page.</Text>
        <Group>
          <Button component={Link} to="/home" size="xl" color="brand" leftSection={<IconHome />}>
            Back to Home
          </Button>
        </Group>
      </UiStack>
    </Container>
  )
}

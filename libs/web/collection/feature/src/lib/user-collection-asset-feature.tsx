import {
  AspectRatio,
  Badge,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'
import { IdentityProvider } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserCollectionAssetFindOne, useUserCollectionFindOne } from '@pubkey-link/web-collection-data-access'
import { AppUiDebugModal } from '@pubkey-link/web-core-ui'
import { useCluster } from '@pubkey-link/web-solana-data-access'
import { UiBack, UiCopy, UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'

export function UserCollectionAssetFeature() {
  const { assetId, collectionId } = useParams() as { assetId: string; collectionId: string }
  const { data, isLoading, isError, error } = useUserCollectionAssetFindOne({ assetId, collectionId })
  const { data: collection } = useUserCollectionFindOne({ collectionId })
  const { communityId } = useParams() as { communityId: string }
  const { getExplorerUrl } = useCluster()
  const { user } = useAuth()

  const userWallets = user?.identities?.filter((identity) => identity.provider === IdentityProvider.Solana)
  const isOwned = userWallets?.some((wallet) => wallet.providerId === data?.owner)

  if (isLoading) {
    return <UiLoader />
  }

  if (isError) {
    return <UiError message={error?.message} />
  }

  if (!data) {
    return <UiError message="Asset not found." />
  }

  console.log(data)

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <UiPage
      title={
        <Group>
          {data.name}
          {isOwned && (
            <Badge bg="#0C291F" size="md" variant="default">
              <Text size="xs" c="#77DEBB">
                Owned
              </Text>
            </Badge>
          )}
        </Group>
      }
      leftAction={<UiBack to={`/c/${communityId}/collections/${collectionId}`} />}
    >
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Stack gap="lg">
            <Card withBorder p={0}>
              <Card.Section>
                <AspectRatio ratio={1}>
                  <Image src={data.imageUrl} alt={data.name} />
                </AspectRatio>
              </Card.Section>
            </Card>

            <Card withBorder>
              <Stack gap="xs">
                <Text size="sm" fw={600} c="dimmed">
                  Description
                </Text>
                <Text size="sm">{data.description}</Text>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }}>
          <Stack gap="lg">
            <Card withBorder>
              <Stack gap="md">
                <Text size="sm" fw={600} c="dimmed">
                  Owner
                </Text>
                <Group justify="space-between" wrap="nowrap">
                  <Text size="sm" c="dimmed">
                    Wallet Address: {data.owner}
                  </Text>
                  <UiCopy text={data.owner} tooltip="Copy wallet address" />
                </Group>
                <Button
                  component="a"
                  href={getExplorerUrl(`address/${data.owner}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  leftSection={<IconExternalLink size={16} />}
                  fullWidth
                >
                  View on Explorer
                </Button>
              </Stack>
            </Card>

            {data.attributes && data.attributes.length > 0 && (
              <Card withBorder>
                <Stack gap="md">
                  <Text size="sm" fw={600} c="dimmed">
                    Traits
                  </Text>
                  <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="md">
                    {data.attributes.map((attribute) => (
                      <Card key={attribute.key} withBorder p="xs" bg="dark.7">
                        <Stack gap={4}>
                          <Text size="xs" c="dimmed" tt="uppercase">
                            {attribute.key}
                          </Text>
                          <Group gap="xs">
                            <Text fw={500} size="sm">
                              {attribute.value || '-'}
                            </Text>
                            {attribute.count !== null && attribute.count !== undefined && (
                              <Badge size="xs" variant="light">
                                {attribute.count}
                              </Badge>
                            )}
                          </Group>
                        </Stack>
                      </Card>
                    ))}
                  </SimpleGrid>
                </Stack>
              </Card>
            )}

            <Card withBorder>
              <Stack gap="md">
                <Text size="sm" fw={600} c="dimmed">
                  Details
                </Text>
                <Stack gap="sm">
                  <Group justify="space-between" wrap="nowrap">
                    <Text size="sm" c="dimmed">
                      Asset Type:
                    </Text>
                    <Group gap="xs">
                      <Text size="sm">{data.assetType}</Text>
                    </Group>
                  </Group>

                  <Group justify="space-between" wrap="nowrap">
                    <Text size="sm" c="dimmed">
                      Asset ID:
                    </Text>
                    <Group gap="xs">
                      <Text size="sm">{truncateAddress(data.id)}</Text>
                      <UiCopy text={data.id} tooltip="Copy asset ID" />
                      <Button
                        component="a"
                        href={getExplorerUrl(`address/${data.id}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="subtle"
                        size="compact-xs"
                        p={4}
                      >
                        <IconExternalLink size={16} />
                      </Button>
                    </Group>
                  </Group>

                  {data.onChainCollectionAddress && (
                    <Group justify="space-between" wrap="nowrap">
                      <Text size="sm" c="dimmed">
                        On-chain Collection:
                      </Text>
                      <Group gap="xs">
                        <Text size="sm">{truncateAddress(data.onChainCollectionAddress)}</Text>
                        <UiCopy text={data.onChainCollectionAddress} tooltip="Copy collection address" />
                        <Button
                          component="a"
                          href={getExplorerUrl(`address/${data.onChainCollectionAddress}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="subtle"
                          size="compact-xs"
                          p={4}
                        >
                          <IconExternalLink size={16} />
                        </Button>
                      </Group>
                    </Group>
                  )}

                  {data.royalty !== null && data.royalty !== undefined && (
                    <Group justify="space-between" wrap="nowrap">
                      <Text size="sm" c="dimmed">
                        Royalties:
                      </Text>
                      <Text size="sm">👑 {data.royalty}%</Text>
                    </Group>
                  )}
                </Stack>
              </Stack>
            </Card>

            {data.jsonMetadataUrl && (
              <Card withBorder>
                <Stack gap="md">
                  <Text size="sm" fw={600} c="dimmed">
                    JSON Metadata
                  </Text>
                  <Group justify="space-between" wrap="nowrap">
                    <Text size="sm" c="dimmed" style={{ wordBreak: 'break-all' }}>
                      {data.jsonMetadataUrl}
                    </Text>
                    <UiCopy text={data.jsonMetadataUrl} tooltip="Copy JSON metadata URL" />
                  </Group>
                  <Button
                    component="a"
                    href={data.jsonMetadataUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="light"
                    leftSection={<IconExternalLink size={16} />}
                    fullWidth
                  >
                    View JSON Metadata
                  </Button>
                </Stack>
              </Card>
            )}

            {collection && (
              <Card
                component="a"
                href={`/c/${communityId}/collections/${collectionId}`}
                withBorder
                p="md"
                style={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="md">
                    <Image src={collection.imageUrl} alt={collection.name} w={60} h={60} radius="sm" />
                    <Text size="sm" fw={500}>
                      View Full Collection
                    </Text>
                  </Group>
                  <IconExternalLink size={20} />
                </Group>
              </Card>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </UiPage>
  )
}

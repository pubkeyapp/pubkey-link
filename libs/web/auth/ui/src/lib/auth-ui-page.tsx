import { Divider, Group, Paper } from '@mantine/core'
import { useAnonGetCommunities } from '@pubkey-link/web-community-data-access'
import { CommunityUiItem, CommunityUiSocials } from '@pubkey-link/web-community-ui'
import { UiGroup, UiLoader, UiLogoType, UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { AuthUiEnabled } from './auth-ui-enabled'
import classes from './auth-ui-page.module.css'

const images = [
  'https://images.pexels.com/photos/1888883/pexels-photo-1888883.jpeg',
  'https://images.pexels.com/photos/8954107/pexels-photo-8954107.jpeg',
]
const image = images[Math.floor(Math.random() * images.length)]
export function AuthUiPage({ authEnabled, children }: { authEnabled: boolean; children: ReactNode }) {
  const { query, items } = useAnonGetCommunities()
  return (
    <div className={classes.wrapper} style={{ backgroundImage: `url(${image})` }}>
      <div className={classes.overlay}>
        <Paper className={classes.form} radius={0} p={30}>
          <UiStack gap={48}>
            <Group justify="center">
              <UiLogoType height={48} />
            </Group>
            <Divider label="Communities hosted on this instance" labelPosition="center" mt="lg" />
            {query.isLoading ? (
              <UiLoader />
            ) : (
              <UiStack gap={32}>
                {items.map((item) => (
                  <UiGroup key={item.id}>
                    <CommunityUiItem community={item} />
                    <CommunityUiSocials community={item} />
                  </UiGroup>
                ))}
              </UiStack>
            )}
            <AuthUiEnabled authEnabled={authEnabled}>{children}</AuthUiEnabled>
          </UiStack>
        </Paper>
      </div>
    </div>
  )
}

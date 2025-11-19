import { Image } from '@mantine/core'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { UiLogoType } from '@pubkey-ui/core'
import { useUiColorScheme } from '../../../ui/src/lib/app-ui-theme'

export function AppLogo({ height = 28 }: { height?: number }) {
  const { colorScheme } = useUiColorScheme()
  const { appLogoUrlDark, appLogoUrlLight } = useAppConfig()

  const appLogoUrl = colorScheme === 'dark' ? appLogoUrlDark : appLogoUrlLight

  return appLogoUrl ? <Image src={appLogoUrl} height={height} /> : <UiLogoType height={height} />
}

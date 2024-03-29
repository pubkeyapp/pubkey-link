import { Image } from '@mantine/core'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { UiLogoType, useUiColorScheme } from '@pubkey-ui/core'

export function AppLogo({ height = 28 }: { height?: number }) {
  const { colorScheme } = useUiColorScheme()
  const { appLogoUrlDark, appLogoUrlLight } = useAppConfig()

  const appLogoUrl = colorScheme === 'dark' ? appLogoUrlDark : appLogoUrlLight

  return appLogoUrl ? <Image src={appLogoUrl} height={height} /> : <UiLogoType height={height} />
}

import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export function useUiBreakpoints() {
  const { breakpoints } = useMantineTheme()
  const isSm = useMediaQuery(`(max-width: ${breakpoints.sm})`)
  const isMd = useMediaQuery(`(max-width: ${breakpoints.md})`)

  return {
    isSm: isSm ?? false,
    isMd: isMd ?? false,
  }
}

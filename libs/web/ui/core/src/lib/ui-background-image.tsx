import { Box } from '@mantine/core'
import { ReactNode, useMemo } from 'react'

const defaultImages = [
  'https://images.pexels.com/photos/1888883/pexels-photo-1888883.jpeg',
  'https://images.pexels.com/photos/8954107/pexels-photo-8954107.jpeg',
]

export function UiBackgroundImage({ children, images = defaultImages }: { children: ReactNode; images?: string[] }) {
  const image = useMemo(() => {
    return images[Math.floor(Math.random() * images.length)]
  }, [images])

  return (
    <Box h="100%" bgsz="cover" bgp="center" bgr="no-repeat" style={{ backgroundImage: `url(${image})` }}>
      <Box pos="absolute" h="100%" top={0} left={0} w="100%" bg="rgba(0, 0, 0, 0.5)">
        {children}
      </Box>
    </Box>
  )
}

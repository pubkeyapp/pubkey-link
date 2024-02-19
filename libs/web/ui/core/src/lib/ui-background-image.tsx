import { Box } from '@mantine/core'
import { ReactNode, useMemo } from 'react'

const defaultImages = [
  'https://images.pexels.com/photos/1888883/pexels-photo-1888883.jpeg',
  'https://images.pexels.com/photos/7194619/pexels-photo-7194619.jpeg',
  'https://images.pexels.com/photos/8954107/pexels-photo-8954107.jpeg',
  'https://images.pexels.com/photos/3612932/pexels-photo-3612932.jpeg',
  'https://images.unsplash.com/photo-1597733336794-12d05021d510',
  'https://images.unsplash.com/photo-1620121692029-d088224ddc74',
  'https://images.unsplash.com/photo-1697895648538-0117b2383a03',
  'https://images.unsplash.com/photo-1698571401982-855eac4f6887',
  'https://images.unsplash.com/photo-1706247691880-6a8f94ef4cb0',
  'https://images.unsplash.com/photo-1701962541409-e2c1256a8574',
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

import { AspectRatio, Image, ImageProps } from '@mantine/core'
import { NetworkAsset } from '@pubkey-link/sdk'

export type NetworkAssetUiImageProps = ImageProps & {
  networkAsset?: NetworkAsset
}

export function NetworkAssetUiImage({ networkAsset, ...props }: NetworkAssetUiImageProps) {
  if (!networkAsset?.imageUrl) return null
  return (
    <AspectRatio ratio={1}>
      <Image src={networkAsset.imageUrl} {...props} />
    </AspectRatio>
  )
}

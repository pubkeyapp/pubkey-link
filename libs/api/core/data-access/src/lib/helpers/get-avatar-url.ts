export type AvatarVariant = 'marble' | 'beam' | 'pixel' | 'sunset' | 'ring' | 'bauhaus'
export interface AvatarOptions {
  variant?: AvatarVariant
  square?: boolean
}

export function getAvatarUrl(name?: string, options: AvatarOptions = {}): string {
  if (!name) {
    return ''
  }
  const variant = options.variant ?? 'pixel'
  const square = options.square ?? false
  const colors = ['412973', '753979', 'B1476D', 'EB9064', 'BED9C8']
  return `https://source.boringavatars.com/${variant}/120/${name}?colors=${colors.join(',')}${square ? '&square' : ''}`
}

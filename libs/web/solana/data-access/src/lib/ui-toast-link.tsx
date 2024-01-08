import { Anchor } from '@mantine/core'
import { NotificationData } from '@mantine/notifications'
import { toastSuccess } from '@pubkey-ui/core'

export function uiToastLink({
  label,
  link,
  ...props
}: Omit<NotificationData, 'message'> & { link: string; label: string }) {
  return toastSuccess({
    ...props,
    message: (
      <Anchor c="brand" href={link} target="_blank" rel="noopener noreferrer">
        {label}
      </Anchor>
    ),
  })
}

import { UiDebug, UiStack } from '@pubkey-ui/core'

export function UserPubkeyProfileFeature({ username }: { username: string }) {
  return (
    <UiStack>
      <UiDebug data={{ username }} open />
    </UiStack>
  )
}

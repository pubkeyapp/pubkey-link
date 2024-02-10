import {
  getNetworkTokenTypeDescription,
  getNetworkTokenTypeTitle,
  isNetworkTokenType,
  NetworkTokenType,
} from '@pubkey-link/resolvers'

import { UiAlertProps, UiInfo, UiWarning } from '@pubkey-ui/core'

export function RoleConditionUiInfo({ type, ...props }: Omit<UiAlertProps, 'message'> & { type: NetworkTokenType }) {
  if (isNetworkTokenType(type)) {
    return <UiInfo title={getNetworkTokenTypeTitle(type)} message={getNetworkTokenTypeDescription(type)} {...props} />
  }

  return <UiWarning message={`Unknown condition type: ${type}`} />
}

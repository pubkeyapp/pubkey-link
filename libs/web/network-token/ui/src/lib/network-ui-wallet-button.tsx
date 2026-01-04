import { Button, ButtonProps } from '@mantine/core'
import { NetworkToken, SOLANA_PROGRAM_ID_MPL_CORE } from '@pubkey-link/sdk'
import { UiIcon } from '@pubkey-link/web-core-ui'
import { Link } from 'react-router-dom'

export function NetworkUiWalletButton({ token, ...props }: ButtonProps & { token: NetworkToken }) {
  if (token.program !== SOLANA_PROGRAM_ID_MPL_CORE) {
    return null
  }
  return (
    <Button
      component={Link}
      to={`/wallet/${token.account}`}
      size="xs"
      leftSection={<UiIcon size={20} type={'wallet'} />}
      {...props}
    >
      Wallet
    </Button>
  )
}

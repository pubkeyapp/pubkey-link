import { Alert, Badge, Button, rem, Stepper, StepperProps, Switch } from '@mantine/core'
import { ellipsify } from '@pubkey-link/sdk'
import { UiGroup, useUiBreakpoints } from '@pubkey-ui/core'
import { WalletDisconnectButton, WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { IconAlertTriangle, IconUsb, IconWallet } from '@tabler/icons-react'
import { useMemo, useState } from 'react'

export interface IdentityUiSolanaWizardProps extends Omit<StepperProps, 'children' | 'active'> {
  exists?: boolean
  sign: (useLedger: boolean) => Promise<boolean>
}

export function IdentityUiSolanaWizard({ exists, sign, ...props }: IdentityUiSolanaWizardProps) {
  const { isSm } = useUiBreakpoints()
  const { connected, publicKey, wallet } = useWallet()
  const [signed, setSigned] = useState(false)
  const [useLedger, setUseLedger] = useState<boolean>(false)

  const active = useMemo(() => {
    if (!wallet) {
      setSigned(false)
      return 0
    }
    if (!connected || !publicKey || exists) {
      setSigned(false)
      return 1
    }
    if (!signed) {
      return 2
    }
    return 3
  }, [exists, wallet, connected, publicKey, signed])

  return (
    <Stepper {...props} allowNextStepsSelect={false} active={active} orientation={isSm ? 'vertical' : 'horizontal'}>
      <Stepper.Step
        label="Select wallet"
        description={connected ? `Wallet ${ellipsify(publicKey?.toBase58())}` : 'Wallet not selected'}
      >
        <UiGroup mt="md" justify="end">
          <WalletMultiButton size="lg" fullWidth={isSm} />
        </UiGroup>
      </Stepper.Step>
      <Stepper.Step label="Connect wallet" description={connected ? `Wallet connected` : 'Wallet not connected'}>
        <UiGroup mt="md" align="start">
          <WalletDisconnectButton variant="light" size="lg" fullWidth={isSm} />
          {exists ? (
            <Alert color="brand" title="This wallet is already linked." icon={<IconAlertTriangle />} />
          ) : (
            <WalletMultiButton size="lg" fullWidth={isSm} />
          )}
        </UiGroup>
      </Stepper.Step>
      <Stepper.Step label="Sign message" description={signed ? 'Verified' : 'Ready to verify'}>
        <UiGroup mt="md" align="start">
          <WalletDisconnectButton variant="light" size="lg" fullWidth={isSm} />
          <UiGroup align="center" justify="stretch" w={isSm ? '100%' : undefined}>
            <Switch
              size="lg"
              checked={useLedger}
              onChange={() => setUseLedger((useLedger) => !useLedger)}
              onLabel={<IconWallet style={{ width: rem(16), height: rem(16) }} stroke={2.5} />}
              offLabel={<IconUsb style={{ width: rem(16), height: rem(16) }} stroke={2.5} />}
            />

            <Button
              disabled={exists}
              style={{ flexGrow: isSm ? 1 : undefined }}
              leftSection={useLedger ? <IconUsb /> : <IconWallet />}
              onClick={() => sign(useLedger).then(setSigned)}
              size="lg"
            >
              Verify {useLedger ? 'Ledger' : 'Wallet'}
            </Button>
          </UiGroup>
        </UiGroup>
      </Stepper.Step>
      <Stepper.Completed>
        <UiGroup mt="md" align="start">
          <WalletDisconnectButton size="lg" />
          <Badge size="xl" variant="light" color="green">
            {useLedger ? 'Ledger' : 'Wallet'} verified
          </Badge>
        </UiGroup>
      </Stepper.Completed>
    </Stepper>
  )
}

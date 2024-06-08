import { IdentityProvider, RequestIdentityChallengeInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { UiError, UiLoader, UiStack } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { IdentityUiSolanaShowCliChallenge } from './identity-ui-solana-show-cli-challenge'

export function IdentityUiSolanaRequestChallengeCli({
  providerId,
  setChallenge,
}: {
  providerId: string
  setChallenge: (challenge: string) => void
}) {
  const sdk = useSdk()
  const input: RequestIdentityChallengeInput = { provider: IdentityProvider.Solana, providerId }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userRequestIdentityChallengeCli', input],
    queryFn: () =>
      sdk.userRequestIdentityChallengeCli({ input }).then((res) => {
        setChallenge(res.data?.challenge?.challenge ?? '')
        return res.data?.challenge?.challenge ?? ''
      }),
    retry: 0,
  })

  return isLoading ? (
    <UiStack align={'center'}>
      <UiLoader />
    </UiStack>
  ) : isError ? (
    <UiError title="Error getting challenge" message={error?.message ?? 'Unknown error'} />
  ) : data ? (
    <IdentityUiSolanaShowCliChallenge challenge={data} />
  ) : (
    <UiStack align={'center'}>
      <p>No challenge for {providerId}</p>
      <UiLoader />
    </UiStack>
  )
}

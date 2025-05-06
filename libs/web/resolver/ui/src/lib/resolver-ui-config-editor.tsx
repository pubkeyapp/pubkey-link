import { Resolver, ResolverConfigHelius, ResolverType, validateResolverConfigHelius } from '@pubkey-link/sdk'
import { UiAlert, UiCard } from '@pubkey-ui/core'
import { ResolverUiConfigEditorHelius } from './resolver-ui-config-editor-helius'

export function ResolverUiConfigEditor({
  resolver,
  submit,
}: {
  resolver: Resolver
  submit: (data: ResolverConfigHelius) => void
}) {
  try {
    switch (resolver.type) {
      case ResolverType.HeliusCollectionAssets:
      case ResolverType.HeliusTokenAccounts:
        return (
          <UiCard title={`Helius Config: ${resolver.type}`}>
            <ResolverUiConfigEditorHelius
              cluster={resolver.cluster}
              config={validateResolverConfigHelius(JSON.parse(resolver.config ?? '{}'))}
              submit={submit}
            />
          </UiCard>
        )
      default:
        return <UiAlert message={`No editor implemented for ${resolver.type}`} />
    }
  } catch {
    return <UiAlert message="Resolver Config: Invalid JSON" />
  }
}

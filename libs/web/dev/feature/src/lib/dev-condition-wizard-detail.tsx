import { Accordion, Grid, NavLink } from '@mantine/core'
import { Community, NetworkToken, Rule } from '@pubkey-link/sdk'
import { useAdminFindOneCommunity } from '@pubkey-link/web-community-data-access'
import { CommunityUiItem } from '@pubkey-link/web-community-ui'
import { useAdminFindManyNetworkToken } from '@pubkey-link/web-network-token-data-access'
import { useAdminFindManyRule, useUserFindOneRule } from '@pubkey-link/web-rule-data-access'
import {
  RuleConditionUiCreateWizard,
  RuleConditionUiItem,
  RuleConditionUiPanel,
  RuleUiItem,
} from '@pubkey-link/web-rule-ui'
import { UiCard, UiCardTitle, UiError, UiInfo, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'
import { Link, useLocation, useParams, useRoutes } from 'react-router-dom'

export function DevConditionWizardDetail() {
  const { communityId } = useParams() as { communityId: string }
  const { item: community } = useAdminFindOneCommunity({ communityId })
  const { items: rules, query } = useAdminFindManyRule({ communityId })

  if (!community) {
    return <UiError message={`Community ${communityId} not found`} />
  }

  return (
    <UiStack>
      <UiCard>
        <CommunityUiItem community={community} />
      </UiCard>
      {query.isLoading ? (
        <UiLoader />
      ) : query.data ? (
        <DevConditionWizardDetailGrid community={community} rules={rules} />
      ) : (
        <UiWarning title="No communities found" message="Please create a community first." />
      )}
    </UiStack>
  )
}

export function DevConditionWizardDetailGrid({ community, rules }: { community: Community; rules: Rule[] }) {
  const { pathname } = useLocation()
  const { items } = useAdminFindManyNetworkToken({ cluster: community.cluster })
  const routes = useRoutes([
    { path: '', element: <UiInfo message="Select a rule to continue" /> },
    { path: ':ruleId', element: <RuleDetails community={community} rules={rules ?? []} tokens={items} /> },
  ])

  return (
    <Grid>
      <Grid.Col span={3}>
        <UiCard>
          <UiStack>
            {rules.map((rule) => (
              <NavLink
                active={pathname.includes('/' + rule.id)}
                component={Link}
                key={rule.id}
                label={<RuleUiItem rule={rule} />}
                to={rule.id}
                variant="light"
              />
            ))}
          </UiStack>
        </UiCard>
      </Grid.Col>
      <Grid.Col span={9}>{routes}</Grid.Col>
    </Grid>
  )
}

function RuleDetails({ community, rules, tokens }: { community: Community; rules: Rule[]; tokens: NetworkToken[] }) {
  const { ruleId } = useParams() as { ruleId: string }
  const { item: rule, query } = useUserFindOneRule({ ruleId })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!rule) {
    return <UiError message={`Rule ${ruleId} not found`} />
  }

  return (
    <UiStack>
      <UiCard>
        <UiCardTitle>Conditions</UiCardTitle>
      </UiCard>
      <RuleConditionUiCreateWizard rule={rule} community={community} tokens={tokens} />
      {rule.conditions?.length ? (
        <Accordion multiple variant="separated">
          {rule.conditions.map((condition) => (
            <Accordion.Item key={condition.id} value={condition.id}>
              <Accordion.Control>
                <RuleConditionUiItem type={condition.type} />
              </Accordion.Control>
              <Accordion.Panel>
                <RuleConditionUiPanel condition={condition} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <UiInfo message="No conditions found" />
      )}
    </UiStack>
  )
}

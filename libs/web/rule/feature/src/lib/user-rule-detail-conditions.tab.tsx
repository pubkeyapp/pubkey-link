import { useUserFindOneRule } from '@pubkey-link/web-rule-data-access'
import { UiDebug, UiError, UiLoader } from '@pubkey-ui/core'
import { RuleCondition } from '@pubkey-link/sdk'
import { Accordion } from '@mantine/core'

export function UserRuleDetailConditionsTab({ ruleId }: { ruleId: string }) {
  const { item, query } = useUserFindOneRule({ ruleId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Rule not found." />
  }

  return <ShowConditions conditions={item.conditions ?? []} />
}

function ShowConditions({ conditions }: { conditions: RuleCondition[] }) {
  return (
    <Accordion variant="contained" multiple>
      {conditions.map((condition) => (
        <Accordion.Item key={condition.id} value={condition.id}>
          <Accordion.Control>{condition.name}</Accordion.Control>
          <Accordion.Panel>
            <UiDebug data={condition} open />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

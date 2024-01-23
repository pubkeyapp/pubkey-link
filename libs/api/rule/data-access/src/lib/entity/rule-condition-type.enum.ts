import { registerEnumType } from '@nestjs/graphql'
import { RuleConditionType } from '@prisma/client'
export { RuleConditionType }

registerEnumType(RuleConditionType, { name: 'RuleConditionType' })
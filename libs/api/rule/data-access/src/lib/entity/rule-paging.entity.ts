import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { Rule } from './rule.entity'

@ObjectType()
export class RulePaging extends PagingResponse<Rule>(Rule) {}

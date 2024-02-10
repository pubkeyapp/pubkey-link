import { Field, InputType } from '@nestjs/graphql'
import { IdentityProvider, PagingInput } from '@pubkey-link/api-core-data-access'
import { LogLevel } from '../entity/log-level.enum'
import { LogRelatedType } from '../entity/log-related-type.enum'

@InputType()
export class UserFindManyLogInput extends PagingInput() {
  @Field({ nullable: true })
  communityId?: string
  @Field(() => LogLevel, { nullable: true })
  level?: LogLevel
  @Field({ nullable: true })
  botId?: string | null
  @Field({ nullable: true })
  relatedId?: string
  @Field(() => LogRelatedType, { nullable: true })
  relatedType?: LogRelatedType
  @Field(() => IdentityProvider, { nullable: true })
  identityProvider?: IdentityProvider | null
  @Field({ nullable: true })
  identityProviderId?: string | null
  @Field({ nullable: true })
  networkAssetId?: string
  @Field({ nullable: true })
  userId?: string | null
  @Field({ nullable: true })
  roleId?: string
  @Field({ nullable: true })
  search?: string
}

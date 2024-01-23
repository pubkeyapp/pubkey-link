import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateNetworkInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  decimals?: number
  @Field({ nullable: true })
  endpoint?: string
  @Field({ nullable: true })
  explorerUrl?: string
  @Field({ nullable: true })
  symbol?: string
}

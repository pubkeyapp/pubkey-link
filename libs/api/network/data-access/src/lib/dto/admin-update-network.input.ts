import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateNetworkInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  endpoint?: string
  @Field({ nullable: true })
  enableSync?: boolean
}

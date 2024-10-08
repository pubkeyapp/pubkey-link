import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateBotServerInput {
  @Field(() => [String], { nullable: true })
  adminRoles?: string[]
  @Field({ nullable: true })
  botChannel?: string
  @Field({ nullable: true })
  dryRun?: boolean
  @Field({ nullable: true })
  enableSync?: boolean
  @Field({ nullable: true })
  verbose?: boolean
}

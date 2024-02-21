import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateBotServerInput {
  @Field({ nullable: true })
  adminRole?: string
  @Field({ nullable: true })
  botChannel?: string
  @Field({ nullable: true })
  dryRun?: boolean
  @Field({ nullable: true })
  enableSync?: boolean
  @Field({ nullable: true })
  mentionUsers?: boolean
  @Field({ nullable: true })
  mentionRoles?: boolean
  @Field({ nullable: true })
  verbose?: boolean
}

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateBotServerInput {
  @Field({ nullable: true })
  adminRole?: string
  @Field({ nullable: true })
  commandChannel?: string
  @Field({ nullable: true })
  dryRun?: boolean
  @Field({ nullable: true })
  verbose?: boolean
}

import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DiscordServer {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field({ nullable: true })
  icon?: string | null
  @Field(() => [String], { nullable: true })
  permissions?: string[] | null
}
@ObjectType()
export class DiscordServerRole {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field()
  managed!: boolean
  @Field(() => Int)
  color!: number
  @Field(() => Int)
  position!: number
}

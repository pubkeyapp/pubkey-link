import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SnapshotOwner {
  @Field({ nullable: true })
  username!: string
  @Field({ nullable: true })
  discordId!: string
}

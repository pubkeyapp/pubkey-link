import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SnapshotAsset {
  @Field({ nullable: true })
  account!: string
  @Field({ nullable: true })
  balance!: string
  @Field({ nullable: true })
  mint!: string
  @Field({ nullable: true })
  owner!: string
}

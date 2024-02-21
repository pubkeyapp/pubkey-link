import { Field, Int, ObjectType } from '@nestjs/graphql'
import { SnapshotAsset } from './snapshot-asset'
import { SnapshotOwner } from './snapshot-owner'

@ObjectType()
export class SnapshotItem {
  @Field(() => Int, { nullable: true })
  items!: number
  @Field({ nullable: true })
  balance!: string
  @Field(() => SnapshotOwner, { nullable: true })
  owner!: SnapshotOwner
  @Field(() => [SnapshotAsset], { nullable: true })
  assets!: SnapshotAsset[]
}

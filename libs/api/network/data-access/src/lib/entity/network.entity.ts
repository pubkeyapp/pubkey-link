import { Field, ObjectType } from '@nestjs/graphql'
import { NetworkCluster } from './network-cluster.enum'
import { NetworkType } from './network-type.enum'

@ObjectType()
export class Network {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => NetworkCluster)
  cluster!: NetworkCluster
  @Field(() => NetworkType)
  type!: NetworkType
  @Field()
  name!: string
  @Field()
  endpoint!: string
  @Field({ nullable: true })
  enableSync?: boolean
}

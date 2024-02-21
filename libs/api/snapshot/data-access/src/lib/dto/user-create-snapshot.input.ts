import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateSnapshotInput {
  @Field()
  roleId!: string
}

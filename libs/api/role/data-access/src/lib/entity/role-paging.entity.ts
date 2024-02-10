import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { Role } from './role.entity'

@ObjectType()
export class RolePaging extends PagingResponse<Role>(Role) {}

import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { AppUser } from './app-user.entity'

@ObjectType()
export class AppUserPaging extends PagingResponse<AppUser>(AppUser) {}

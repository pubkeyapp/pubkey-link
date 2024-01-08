import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { App } from './app.entity'

@ObjectType()
export class AppPaging extends PagingResponse<App>(App) {}

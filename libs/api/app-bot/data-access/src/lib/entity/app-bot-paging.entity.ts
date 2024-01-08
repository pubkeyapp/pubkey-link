import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { AppBot } from './app-bot.entity'

@ObjectType()
export class AppBotPaging extends PagingResponse<AppBot>(AppBot) {}

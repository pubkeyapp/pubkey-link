import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { Log } from './log.entity'

@ObjectType()
export class LogPaging extends PagingResponse<Log>(Log) {}

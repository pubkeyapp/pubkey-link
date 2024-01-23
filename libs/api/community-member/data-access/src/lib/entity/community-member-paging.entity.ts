import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { CommunityMember } from './community-member.entity'

@ObjectType()
export class CommunityMemberPaging extends PagingResponse<CommunityMember>(CommunityMember) {}

import { InputType } from '@nestjs/graphql'
import { LinkIdentityInput } from './link-identity-input'

@InputType()
export class RequestIdentityChallengeInput extends LinkIdentityInput {}

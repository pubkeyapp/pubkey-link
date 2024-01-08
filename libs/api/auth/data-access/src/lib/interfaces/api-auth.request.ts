import { User } from '@prisma/client'
import { Request } from 'express-serve-static-core'

export interface ApiAuthRequest extends Request {
  user?: User
}

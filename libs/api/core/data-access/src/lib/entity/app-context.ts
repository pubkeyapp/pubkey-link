import { Request, Response } from 'express-serve-static-core'

export interface BaseContext {
  req: Request
  res: Response
}

export interface AppContext extends BaseContext {
  user?: unknown
}

export function getRequestDetails({ req }: AppContext): { userAgent: string } {
  const userAgent = (req.headers['user-agent'] as string) ?? 'none'

  return { userAgent }
}

import { Request, Response } from 'express-serve-static-core'

export interface BaseContext {
  req: Request
  res: Response
}

export interface AppContext extends BaseContext {
  user?: unknown
}

export function getRequestDetails({ req }: AppContext): { ip: string; userAgent: string } {
  const ip = req.ip ?? (req.headers['x-forwarded-for'] as string) ?? 'none'
  const userAgent = (req.headers['user-agent'] as string) ?? 'none'

  return { ip, userAgent }
}

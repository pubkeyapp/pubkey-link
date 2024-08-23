import { HttpStatus, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express-serve-static-core'
import * as process from 'process'

export class BullDashboardMiddleware implements NestMiddleware {
  private readonly envCreds = process.env['BULL_ADMIN'] ?? `admin:${Math.random().toString(36).substring(16)}`
  private readonly encodedCreds = Buffer.from(this.envCreds).toString('base64')

  constructor() {
    Logger.verbose(`BullDashboard: log in using ${this.envCreds} at /api/queues `)
  }
  use(req: Request, res: Response, next: NextFunction) {
    const reqCreds = req.get('authorization')?.split('Basic ')?.[1] ?? null

    if (this.encodedCreds && reqCreds !== this.encodedCreds) {
      res.setHeader('WWW-Authenticate', 'Basic realm="realm", charset="UTF-8"')
      res.sendStatus(HttpStatus.UNAUTHORIZED)
    } else {
      next()
    }
  }
}

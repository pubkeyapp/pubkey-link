import { lazy } from 'react'

export const AdminBotFeature = lazy(() => import('./lib/admin-bot.routes'))
export const UserBotFeature = lazy(() => import('./lib/user-bot.routes'))

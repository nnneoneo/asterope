import { getAdminSession } from '../../utils/auth'

export default defineEventHandler((event) => {
  const session = getAdminSession(event)
  return { authenticated: Boolean(session), user: session ? { email: session.email } : null }
})

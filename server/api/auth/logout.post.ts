import { logoutAdmin } from '../../utils/auth'

export default defineEventHandler((event) => {
  return logoutAdmin(event)
})

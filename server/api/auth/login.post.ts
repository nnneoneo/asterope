import { loginAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = await loginAdmin(event)
  return { user }
})

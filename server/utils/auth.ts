import {
  createError,
  deleteCookie,
  getCookie,
  readBody,
  setCookie,
  type H3Event
} from 'h3'
import { createHmac, timingSafeEqual } from 'node:crypto'

const cookieName = 'asterope_admin_session'
const sessionDurationSeconds = 60 * 60 * 8

function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url')
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

function createSession(email: string, secret: string) {
  const payload = Buffer.from(
    JSON.stringify({
      email,
      exp: Math.floor(Date.now() / 1000) + sessionDurationSeconds
    })
  ).toString('base64url')

  return `${payload}.${sign(payload, secret)}`
}

function parseSession(token: string | undefined, secret: string) {
  if (!token) return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature || !safeEqual(signature, sign(payload, secret))) return null

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      email: string
      exp: number
    }
    if (!session.email || session.exp < Math.floor(Date.now() / 1000)) return null
    return session
  } catch {
    return null
  }
}

export function getAdminSession(event: H3Event) {
  const config = useRuntimeConfig()
  return parseSession(getCookie(event, cookieName), config.authSecret)
}

export function requireAdmin(event: H3Event) {
  const session = getAdminSession(event)
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Authentication required' })
  }
  return session
}

export async function loginAdmin(event: H3Event) {
  const config = useRuntimeConfig()
  const body = await readBody<{ email?: string; password?: string }>(event)
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')

  const validEmail = safeEqual(email, String(config.adminEmail).toLowerCase())
  const validPassword = safeEqual(password, String(config.adminPassword))

  if (!validEmail || !validPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  setCookie(event, cookieName, createSession(email, config.authSecret), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: sessionDurationSeconds
  })

  return { email }
}

export function logoutAdmin(event: H3Event) {
  deleteCookie(event, cookieName, { path: '/' })
  return { ok: true }
}

import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { sql } from "./db"
import { redis, cacheKeys } from "./redis"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createSession(userId: number): Promise<string> {
  const sessionId = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días

  // Guardar en base de datos
  await sql`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (${sessionId}, ${userId}, ${expiresAt.toISOString()})
  `

  // Cache en Redis
  await redis.setex(
    cacheKeys.session(sessionId),
    7 * 24 * 60 * 60, // 7 días en segundos
    JSON.stringify({ userId, expiresAt: expiresAt.toISOString() }),
  )

  return sessionId
}

export async function getSession(sessionId: string) {
  // Intentar obtener de cache primero
  const cached = await redis.get(cacheKeys.session(sessionId))
  if (cached) {
    const session = JSON.parse(cached as string)
    if (new Date(session.expiresAt) > new Date()) {
      return session
    }
  }

  // Si no está en cache, buscar en base de datos
  const [session] = await sql`
    SELECT s.*, u.email, u.name 
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.id = ${sessionId} AND s.expires_at > NOW()
  `

  return session || null
}

export async function createJWT(payload: any): Promise<string> {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("7d").sign(JWT_SECRET)
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

export async function deleteSession(sessionId: string) {
  await sql`DELETE FROM sessions WHERE id = ${sessionId}`
  await redis.del(cacheKeys.session(sessionId))
}

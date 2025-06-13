import { Redis } from "@upstash/redis"

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error("Upstash Redis credentials are not set")
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Utilidades para cache y sesiones
export const cacheKeys = {
  user: (id: number) => `user:${id}`,
  session: (id: string) => `session:${id}`,
  chatHistory: (userId: number) => `chats:${userId}`,
  rateLimit: (ip: string) => `rate_limit:${ip}`,
}

// Rate limiting
export async function checkRateLimit(ip: string, limit = 10, window = 60) {
  const key = cacheKeys.rateLimit(ip)
  const current = await redis.incr(key)

  if (current === 1) {
    await redis.expire(key, window)
  }

  return current <= limit
}

// Cache de usuario
export async function cacheUser(user: any) {
  await redis.setex(cacheKeys.user(user.id), 3600, JSON.stringify(user))
}

export async function getCachedUser(id: number) {
  const cached = await redis.get(cacheKeys.user(id))
  return cached ? JSON.parse(cached as string) : null
}

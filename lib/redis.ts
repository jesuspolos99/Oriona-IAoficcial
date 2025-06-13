import { Redis } from "@upstash/redis"

// Verificar si las credenciales están disponibles
const REDIS_URL = process.env.KV_REST_API_URL || process.env.KV_REST_API_URL
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN

// Crear cliente Redis solo si las credenciales están disponibles
let redis: Redis | null = null

if (REDIS_URL && REDIS_TOKEN) {
  redis = new Redis({
    url: REDIS_URL,
    token: REDIS_TOKEN,
  })
} else {
  console.warn("⚠️ Redis credentials not found. Redis features will be disabled.")
}

// Utilidades para cache y sesiones
export const cacheKeys = {
  user: (id: number) => `user:${id}`,
  session: (id: string) => `session:${id}`,
  chatHistory: (userId: number) => `chats:${userId}`,
  rateLimit: (ip: string) => `rate_limit:${ip}`,
}

// Rate limiting con fallback
export async function checkRateLimit(ip: string, limit = 10, window = 60) {
  if (!redis) {
    // Si no hay Redis, permitir todas las requests (modo desarrollo)
    console.warn("Redis not available, skipping rate limit check")
    return true
  }

  try {
    const key = cacheKeys.rateLimit(ip)
    const current = await redis.incr(key)

    if (current === 1) {
      await redis.expire(key, window)
    }

    return current <= limit
  } catch (error) {
    console.error("Rate limit check failed:", error)
    return true // Permitir en caso de error
  }
}

// Cache de usuario con fallback
export async function cacheUser(user: any) {
  if (!redis) {
    console.warn("Redis not available, skipping user cache")
    return
  }

  try {
    await redis.setex(cacheKeys.user(user.id), 3600, JSON.stringify(user))
  } catch (error) {
    console.error("Failed to cache user:", error)
  }
}

export async function getCachedUser(id: number) {
  if (!redis) {
    return null
  }

  try {
    const cached = await redis.get(cacheKeys.user(id))
    return cached ? JSON.parse(cached as string) : null
  } catch (error) {
    console.error("Failed to get cached user:", error)
    return null
  }
}

// Exportar redis para uso en auth.ts
export { redis }

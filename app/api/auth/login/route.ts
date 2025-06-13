import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { verifyPassword, createSession, createJWT } from "@/lib/auth"
import { checkRateLimit, cacheUser } from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || "unknown"

    // Rate limiting
    const allowed = await checkRateLimit(ip, 10, 300) // 10 intentos por 5 minutos
    if (!allowed) {
      return NextResponse.json({ error: "Demasiados intentos. Intenta de nuevo en 5 minutos." }, { status: 429 })
    }

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña son requeridos" }, { status: 400 })
    }

    // Buscar usuario
    const [user] = await sql`
      SELECT id, name, email, password_hash, is_verified
      FROM users 
      WHERE email = ${email.toLowerCase()}
    `

    if (!user) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    // Verificar contraseña
    const isValidPassword = await verifyPassword(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    // Crear sesión
    const sessionId = await createSession(user.id)

    // Cache del usuario
    await cacheUser({
      id: user.id,
      name: user.name,
      email: user.email,
      is_verified: user.is_verified,
    })

    // Crear JWT
    const token = await createJWT({
      userId: user.id,
      sessionId,
    })

    const response = NextResponse.json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_verified: user.is_verified,
      },
    })

    // Establecer cookies
    response.cookies.set("session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 días
    })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 días
    })

    return response
  } catch (error) {
    console.error("Error en login:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

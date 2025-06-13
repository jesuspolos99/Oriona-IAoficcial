import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { hashPassword } from "@/lib/auth"
import { checkRateLimit } from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || "unknown"

    // Rate limiting
    const allowed = await checkRateLimit(ip, 5, 300) // 5 intentos por 5 minutos
    if (!allowed) {
      return NextResponse.json({ error: "Demasiados intentos. Intenta de nuevo en 5 minutos." }, { status: 429 })
    }

    const { name, email, password } = await request.json()

    // Validaciones
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 })
    }

    // Verificar si el usuario ya existe
    const [existingUser] = await sql`
      SELECT id FROM users WHERE email = ${email.toLowerCase()}
    `

    if (existingUser) {
      return NextResponse.json({ error: "Ya existe una cuenta con este email" }, { status: 400 })
    }

    // Crear usuario
    const passwordHash = await hashPassword(password)

    const [user] = await sql`
      INSERT INTO users (name, email, password_hash)
      VALUES (${name}, ${email.toLowerCase()}, ${passwordHash})
      RETURNING id, name, email, created_at
    `

    return NextResponse.json({
      message: "Cuenta creada exitosamente",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Error en registro:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

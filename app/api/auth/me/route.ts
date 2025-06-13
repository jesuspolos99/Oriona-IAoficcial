import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getCachedUser } from "@/lib/redis"

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get("session")?.value

    if (!sessionId) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const session = await getSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: "Sesión inválida" }, { status: 401 })
    }

    // Intentar obtener usuario del cache
    let user = await getCachedUser(session.userId || session.user_id)

    if (!user) {
      // Si no está en cache, usar los datos de la sesión
      user = {
        id: session.userId || session.user_id,
        name: session.name,
        email: session.email,
      }
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error en /api/auth/me:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

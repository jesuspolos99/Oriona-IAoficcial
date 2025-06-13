import { type NextRequest, NextResponse } from "next/server"
import { deleteSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get("session")?.value

    if (sessionId) {
      await deleteSession(sessionId)
    }

    const response = NextResponse.json({ message: "Sesión cerrada exitosamente" })

    // Limpiar cookies
    response.cookies.delete("session")
    response.cookies.delete("token")

    return response
  } catch (error) {
    console.error("Error en logout:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

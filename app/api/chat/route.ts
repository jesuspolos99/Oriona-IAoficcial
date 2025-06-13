import { type CoreMessage, streamText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: Request) {
  try {
    const { messages }: { messages: CoreMessage[] } = await req.json()

    console.log("Iniciando llamada a Groq con", messages.length, "mensajes")

    const result = streamText({
      model: groq("llama-3.1-8b-instant", {
        apiKey: "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",
      }),
      system:
        "Eres Oriona, una asistente de IA inteligente y amigable. Respondes de manera útil, clara y concisa en español. Eres conocida por ser muy capaz y tener una personalidad cálida y profesional.",
      messages,
      maxTokens: 1000,
      temperature: 0.7,
    })

    console.log("Groq respondió exitosamente")
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error detallado:", error)

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return Response.json({ error: "Error de autenticación con Groq API" }, { status: 401 })
      }
      if (error.message.includes("rate limit")) {
        return Response.json({ error: "Límite de velocidad alcanzado. Intenta en unos segundos." }, { status: 429 })
      }
      if (error.message.includes("model")) {
        return Response.json({ error: "Error con el modelo de IA. Intenta de nuevo." }, { status: 400 })
      }
    }

    return Response.json(
      { error: `Error interno: ${error instanceof Error ? error.message : "Error desconocido"}` },
      { status: 500 },
    )
  }
}

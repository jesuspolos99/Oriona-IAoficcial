"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { useChat } from "ai/react"

import { ArrowUpIcon, AlertCircle, RefreshCw, Sparkles, Zap, Menu, Plus, Star, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/autoresize-textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sidebar } from "@/components/sidebar"
import { SpaceElements } from "@/components/space-elements"
import { AlienLogo } from "@/components/alien-logo"
import { useChatContext } from "@/lib/chat-context"

export function ChatForm({ className, ...props }: React.ComponentProps<"form">) {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { currentChat, currentChatId, createNewChat, addMessageToChat, clearCurrentChat } = useChatContext()

  // Inicializar mensajes desde el contexto
  const initialMessages = currentChat?.messages || []

  const { messages, input, setInput, append, error, isLoading, reload, setMessages } = useChat({
    api: "/api/chat",
    initialMessages,
    onError: (error) => {
      console.error("Error en useChat:", error)
    },
    onFinish: (message, { messages: allMessages }) => {
      // Guardar todos los mensajes en el contexto cuando termine la conversación
      if (currentChatId && allMessages.length > 0) {
        // Obtener los últimos 2 mensajes (usuario + asistente)
        const lastUserMessage = allMessages[allMessages.length - 2]
        const lastAssistantMessage = allMessages[allMessages.length - 1]

        // Guardar mensaje del usuario si no está ya guardado
        if (lastUserMessage && lastUserMessage.role === "user") {
          addMessageToChat(currentChatId, {
            role: "user",
            content: lastUserMessage.content,
          })
        }

        // Guardar mensaje del asistente
        addMessageToChat(currentChatId, {
          role: "assistant",
          content: lastAssistantMessage.content,
        })
      }
    },
  })

  // Sincronizar mensajes cuando cambie el chat actual
  useEffect(() => {
    if (currentChat) {
      setMessages(currentChat.messages)
    } else {
      setMessages([])
    }
  }, [currentChatId, currentChat, setMessages])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Cambiar la función handleSubmit para no guardar el mensaje del usuario antes de enviarlo
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      // Si no hay chat actual, crear uno nuevo
      let chatId = currentChatId
      if (!chatId) {
        chatId = createNewChat()
      }

      // Solo enviar mensaje, no guardarlo aún
      const userMessage = { content: input, role: "user" as const }
      void append(userMessage)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const handleRetry = () => {
    if (messages.length > 0) {
      reload()
    }
  }

  const handleNewChat = () => {
    createNewChat()
    setMessages([])
  }

  const header = (
    <div className="m-auto flex max-w-4xl flex-col gap-8 text-center px-4">
      {/* Logo marcianito con efectos mejorados */}
      <div className="flex flex-col items-center gap-8 relative z-0">
        <div className="relative z-0">
          {/* Aura galáctica alrededor del alien */}
          <div className="absolute -inset-8 bg-gradient-to-r from-green-400/10 via-emerald-400/5 to-green-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div
            className="absolute -inset-4 bg-gradient-to-r from-green-500/15 via-emerald-500/10 to-green-500/15 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <AlienLogo />
          {/* Partículas orbitando */}
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
          <div
            className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-2 -left-4 w-1 h-1 bg-green-200 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent drop-shadow-2xl tracking-tight relative z-10 animate-pulse">
            ORIONA
          </h1>
          <div className="space-y-2 relative z-10">
            <p className="text-xl md:text-3xl text-green-100 font-semibold tracking-wide">Asistente Cósmica de IA</p>
            <div className="flex items-center justify-center gap-3 text-sm md:text-base text-green-300">
              <Star className="w-3 h-3 text-green-400 animate-pulse" />
              <span className="font-medium">Explorando el universo del conocimiento</span>
              <Star className="w-3 h-3 text-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Características glass verde mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="group bg-gradient-to-br from-green-900/30 via-green-900/20 to-green-800/30 backdrop-blur-xl p-6 rounded-3xl border border-green-500/40 shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 hover:border-green-400/60">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-2xl border border-green-400/30 group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-6 w-6 text-green-400 group-hover:text-green-300" />
            </div>
            <span className="font-bold text-green-300 text-lg group-hover:text-green-200">Velocidad Luz</span>
          </div>
          <p className="text-green-200 text-sm leading-relaxed font-medium group-hover:text-green-100">
            Respuestas instantáneas desde las estrellas más lejanas del cosmos
          </p>
          <div className="absolute top-2 right-2 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
        </div>

        <div className="group bg-gradient-to-br from-emerald-900/30 via-green-900/20 to-emerald-800/30 backdrop-blur-xl p-6 rounded-3xl border border-emerald-500/40 shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:border-emerald-400/60">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500/30 to-green-500/30 backdrop-blur-sm rounded-2xl border border-emerald-400/30 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-6 w-6 text-emerald-400 group-hover:text-emerald-300" />
            </div>
            <span className="font-bold text-emerald-300 text-lg group-hover:text-emerald-200">IA Galáctica</span>
          </div>
          <p className="text-emerald-200 text-sm leading-relaxed font-medium group-hover:text-emerald-100">
            Inteligencia de última generación alimentada por energía cósmica
          </p>
          <div className="absolute top-2 right-2 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
        </div>

        <div className="group bg-gradient-to-br from-green-900/30 via-emerald-900/20 to-green-800/30 backdrop-blur-xl p-6 rounded-3xl border border-green-500/40 shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 hover:border-green-400/60">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-2xl border border-green-400/30 group-hover:scale-110 transition-transform duration-300">
              <span className="text-green-400 font-black text-2xl group-hover:text-green-300">∞</span>
            </div>
            <span className="font-bold text-green-300 text-lg group-hover:text-green-200">Universo Libre</span>
          </div>
          <p className="text-green-200 text-sm leading-relaxed font-medium group-hover:text-green-100">
            Sin límites, como la expansión infinita del espacio-tiempo
          </p>
          <div className="absolute top-2 right-2 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
        </div>
      </div>

      {/* Mensaje de bienvenida glass mejorado */}
      <div className="bg-gradient-to-br from-green-900/30 via-green-900/20 to-emerald-900/30 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-green-500/40 shadow-2xl hover:shadow-green-500/20 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
          <p className="text-green-100 font-bold text-lg md:text-2xl">¡Saludos desde las estrellas! 🛸</p>
          <Rocket className="w-5 h-5 text-green-400 animate-bounce" />
        </div>
        <p className="text-green-200 text-sm md:text-lg leading-relaxed font-medium">
          Soy{" "}
          <span className="text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text font-bold animate-pulse">
            ORIONA
          </span>
          , tu guía cósmica en el vasto universo del conocimiento. Estoy aquí para explorar cualquier galaxia de
          información contigo.
          <br />
          <span className="text-emerald-300 font-semibold">¿Hacia dónde dirigimos nuestro viaje interestelar?</span>
        </p>
        {/* Decoración adicional */}
        <div className="flex justify-center mt-6 gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )

  const messageList = (
    <div className="flex flex-col gap-4 px-4 pb-4">
      {messages.map((message, index) => (
        <div
          key={index}
          data-role={message.role}
          className={cn(
            "max-w-[90%] md:max-w-[85%] rounded-2xl md:rounded-3xl px-4 md:px-6 py-4 md:py-6 shadow-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02]",
            message.role === "assistant"
              ? "self-start bg-gradient-to-br from-green-900/30 via-green-900/20 to-emerald-900/30 border-green-500/40 text-green-100 hover:shadow-green-500/20"
              : "self-end bg-gradient-to-br from-green-600/40 via-green-600/30 to-emerald-600/40 border-green-400/50 text-white hover:shadow-green-400/20",
          )}
        >
          {message.role === "assistant" && (
            <div className="flex items-center gap-3 mb-4 text-xs font-bold text-green-400">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
              <span>ORIONA</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
                <div
                  className="w-1 h-1 bg-emerald-400 rounded-full animate-ping"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-green-300 rounded-full animate-ping"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          )}
          <div className="whitespace-pre-wrap leading-relaxed text-sm font-medium break-words">{message.content}</div>
        </div>
      ))}
      {isLoading && (
        <div className="max-w-[90%] md:max-w-[85%] rounded-2xl md:rounded-3xl px-4 md:px-6 py-4 md:py-6 bg-gradient-to-br from-green-900/30 via-green-900/20 to-emerald-900/30 backdrop-blur-xl border border-green-500/40 text-green-100 self-start shadow-2xl">
          <div className="flex items-center gap-3 mb-4 text-xs font-bold text-green-400">
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
            <span>ORIONA</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-3 bg-green-300 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
            <span className="text-green-300 text-sm font-medium">Navegando por las estrellas...</span>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gradient-to-br from-gray-900 via-green-900/10 to-gray-900 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Contenido principal */}
        <div className={cn("flex-1 flex flex-col relative transition-all duration-300", sidebarOpen && "md:ml-80")}>
          {/* Elementos espaciales de fondo */}
          <SpaceElements />

          {/* Header con botón de menú y crédito restaurado */}
          <div className="flex items-center justify-between p-4 md:p-6 bg-gradient-to-r from-green-900/30 via-green-900/20 to-emerald-900/30 backdrop-blur-xl border-b border-green-500/40 relative z-10 shadow-lg">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-green-300 hover:text-white hover:bg-green-800/50 transition-all duration-200"
              >
                <Menu className="h-5 w-5" />
              </Button>
              {currentChat && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNewChat}
                  className="text-green-300 hover:text-white hover:bg-green-800/50 transition-all duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Chat
                </Button>
              )}
            </div>

            {/* Crédito restaurado y mejorado */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-800/40 to-emerald-800/40 px-4 py-2 rounded-full border border-green-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 text-sm font-bold">
                {currentChat ? (
                  <span className="flex items-center gap-2">
                    <span className="text-green-200">{currentChat.title}</span>
                    <span className="text-green-500">•</span>
                    <span className="text-green-400">ORIONA IA</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="text-green-400">ORIONA IA</span>
                    <span className="text-green-500">•</span>
                    <span className="text-green-300">Creada por</span>
                    <span className="text-emerald-400 font-semibold">Jesus Monsalvo</span>
                    <Star className="w-3 h-3 text-yellow-400 animate-pulse" />
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Área principal de chat con scroll arreglado */}
          <div className="flex-1 flex flex-col relative min-h-0">
            {/* Área de mensajes con scroll funcional */}
            <div className="flex-1 overflow-y-auto scroll-smooth relative z-10" style={{ height: "0" }}>
              <div className="min-h-full py-4 md:py-8">
                {error && (
                  <div className="px-4 md:px-6 mb-4 md:mb-6">
                    <Alert className="border-red-500/40 bg-gradient-to-r from-red-900/30 to-red-800/30 backdrop-blur-xl shadow-2xl">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-200 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <span className="text-sm font-medium">
                          ERROR: {error.message || "No se pudo generar la respuesta"}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRetry}
                          className="h-8 text-sm border-red-400/40 hover:bg-red-800/40 text-red-200 font-medium transition-all duration-200"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Reintentar
                        </Button>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                <div className="flex justify-center items-center min-h-full">
                  {messages.length ? messageList : header}
                </div>
              </div>
            </div>

            {/* Input area glass verde mejorada */}
            <div className="flex-shrink-0 p-4 md:p-6 relative z-10">
              <form onSubmit={handleSubmit} className="relative mx-auto max-w-4xl">
                <div className="relative bg-gradient-to-r from-green-900/30 via-green-900/20 to-emerald-900/30 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-green-500/40 shadow-2xl focus-within:shadow-green-500/40 focus-within:border-green-400/70 transition-all duration-300 hover:border-green-400/50">
                  <AutoResizeTextarea
                    onKeyDown={handleKeyDown}
                    onChange={(v) => setInput(v)}
                    value={input}
                    placeholder={
                      isMobile ? "Pregúntale a ORIONA..." : "Pregúntale algo a ORIONA desde las estrellas..."
                    }
                    className="w-full px-4 md:px-6 py-4 md:py-6 pr-12 md:pr-16 bg-transparent border-none resize-none focus:outline-none placeholder:text-green-400/60 text-green-100 text-sm md:text-lg font-medium"
                    disabled={isLoading}
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="submit"
                        size="sm"
                        className={cn(
                          "absolute bottom-2 md:bottom-3 right-2 md:right-3 rounded-xl md:rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-green-400/40 hover:scale-105",
                          isMobile ? "h-10 w-10" : "h-12 w-12",
                        )}
                        disabled={isLoading || !input.trim()}
                      >
                        <ArrowUpIcon className={cn("text-white font-bold", isMobile ? "h-5 w-5" : "h-6 w-6")} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      sideOffset={12}
                      className="bg-green-800/90 backdrop-blur-sm text-green-100 border border-green-600 font-medium"
                    >
                      {isLoading ? "Enviando..." : "Enviar mensaje"}
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Indicador de estado verde mejorado */}
                <div className="flex items-center justify-center mt-3 md:mt-4 text-xs md:text-sm text-green-400">
                  <div className="flex items-center gap-3 md:gap-4 bg-green-900/20 px-4 py-2 rounded-full border border-green-500/30 backdrop-blur-sm">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div
                        className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-300 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                    <span className="font-medium">
                      {isMobile ? "ORIONA conectada" : "ORIONA está conectada desde la galaxia"}
                    </span>
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full animate-ping"></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

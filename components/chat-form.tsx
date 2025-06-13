"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { useChat } from "ai/react"

import { ArrowUpIcon, AlertCircle, RefreshCw, Sparkles, Zap, Menu, Plus } from "lucide-react"
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
    onFinish: (message) => {
      // Guardar mensaje de la IA en el contexto
      if (currentChatId) {
        addMessageToChat(currentChatId, {
          role: "assistant",
          content: message.content,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      // Si no hay chat actual, crear uno nuevo
      let chatId = currentChatId
      if (!chatId) {
        chatId = createNewChat()
      }

      // Guardar mensaje del usuario en el contexto
      const userMessage = { content: input, role: "user" as const }
      addMessageToChat(chatId, userMessage)

      // Enviar mensaje
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
      {/* Logo marcianito */}
      <div className="flex flex-col items-center gap-8 relative z-0">
        <div className="relative z-0">
          <AlienLogo />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl tracking-tight relative z-10">
            ORIONA
          </h1>
          <div className="space-y-2 relative z-10">
            <p className="text-xl md:text-3xl text-green-100 font-semibold tracking-wide">Asistente Cósmica de IA</p>
            <div className="flex items-center justify-center gap-3 text-sm md:text-base text-green-300">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">Explorando el universo del conocimiento</span>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Características glass verde */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="group bg-green-900/20 backdrop-blur-xl p-6 rounded-3xl border border-green-500/30 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500/20 backdrop-blur-sm rounded-2xl border border-green-400/20">
              <Zap className="h-6 w-6 text-green-400" />
            </div>
            <span className="font-bold text-green-300 text-lg">Velocidad Luz</span>
          </div>
          <p className="text-green-200 text-sm leading-relaxed font-medium">
            Respuestas instantáneas desde las estrellas más lejanas del cosmos
          </p>
        </div>

        <div className="group bg-green-900/20 backdrop-blur-xl p-6 rounded-3xl border border-green-500/30 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500/20 backdrop-blur-sm rounded-2xl border border-green-400/20">
              <Sparkles className="h-6 w-6 text-green-400" />
            </div>
            <span className="font-bold text-green-300 text-lg">IA Galáctica</span>
          </div>
          <p className="text-green-200 text-sm leading-relaxed font-medium">
            Inteligencia de última generación alimentada por energía cósmica
          </p>
        </div>

        <div className="group bg-green-900/20 backdrop-blur-xl p-6 rounded-3xl border border-green-500/30 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500/20 backdrop-blur-sm rounded-2xl border border-green-400/20">
              <span className="text-green-400 font-black text-2xl">∞</span>
            </div>
            <span className="font-bold text-green-300 text-lg">Universo Libre</span>
          </div>
          <p className="text-green-200 text-sm leading-relaxed font-medium">
            Sin límites, como la expansión infinita del espacio-tiempo
          </p>
        </div>
      </div>

      {/* Mensaje de bienvenida glass */}
      <div className="bg-green-900/20 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-green-500/30 shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
          <p className="text-green-100 font-bold text-lg md:text-2xl">¡Saludos desde las estrellas! 🛸</p>
        </div>
        <p className="text-green-200 text-sm md:text-lg leading-relaxed font-medium">
          Soy{" "}
          <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text font-bold">
            ORIONA
          </span>
          , tu guía cósmica en el vasto universo del conocimiento. Estoy aquí para explorar cualquier galaxia de
          información contigo.
          <br />
          <span className="text-emerald-300 font-semibold">¿Hacia dónde dirigimos nuestro viaje interestelar?</span>
        </p>
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
            "max-w-[90%] md:max-w-[85%] rounded-2xl md:rounded-3xl px-4 md:px-6 py-4 md:py-6 shadow-2xl backdrop-blur-xl border",
            message.role === "assistant"
              ? "self-start bg-green-900/20 border-green-500/30 text-green-100"
              : "self-end bg-green-600/30 border-green-400/40 text-white",
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
        <div className="max-w-[90%] md:max-w-[85%] rounded-2xl md:rounded-3xl px-4 md:px-6 py-4 md:py-6 bg-green-900/20 backdrop-blur-xl border border-green-500/30 text-green-100 self-start shadow-2xl">
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

          {/* Header con botón de menú */}
          <div className="flex items-center justify-between p-4 md:p-6 bg-green-900/20 backdrop-blur-xl border-b border-green-500/30 relative z-10">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-green-300 hover:text-white hover:bg-green-800/50"
              >
                <Menu className="h-5 w-5" />
              </Button>
              {currentChat && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNewChat}
                  className="text-green-300 hover:text-white hover:bg-green-800/50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Chat
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-300 text-sm font-bold">
                {currentChat ? currentChat.title : "ORIONA IA (creada por Jesus Monsalvo)"}
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
                    <Alert className="border-red-500/40 bg-red-900/20 backdrop-blur-xl shadow-2xl">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-200 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <span className="text-sm font-medium">
                          ERROR: {error.message || "No se pudo generar la respuesta"}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRetry}
                          className="h-8 text-sm border-red-400/40 hover:bg-red-800/40 text-red-200 font-medium"
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

            {/* Input area glass verde */}
            <div className="flex-shrink-0 p-4 md:p-6 relative z-10">
              <form onSubmit={handleSubmit} className="relative mx-auto max-w-4xl">
                <div className="relative bg-green-900/20 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-green-500/30 shadow-2xl focus-within:shadow-green-500/30 focus-within:border-green-400/60 transition-all duration-300">
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
                          "absolute bottom-2 md:bottom-3 right-2 md:right-3 rounded-xl md:rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-green-400/40",
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

                {/* Indicador de estado verde */}
                <div className="flex items-center justify-center mt-3 md:mt-4 text-xs md:text-sm text-green-400">
                  <div className="flex items-center gap-3 md:gap-4">
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

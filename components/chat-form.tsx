"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { useDeviceDetection } from "@/hooks/use-device-detection"

import { useChat } from "ai/react"

import { Sparkles, Zap, Star } from "lucide-react"
import { AlienLogo } from "@/components/alien-logo"
import { useChatContext } from "@/lib/chat-context"

export function ChatForm({ className, ...props }: React.ComponentProps<"form">) {
  const device = useDeviceDetection()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Verificar que estamos en el cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  const { currentChat, currentChatId, createNewChat, addMessageToChat, clearCurrentChat } = useChatContext()

  // Cerrar sidebar automáticamente en móvil al cambiar orientación
  useEffect(() => {
    if (isClient && device.isClient && device.isMobile && device.orientation === "portrait") {
      setSidebarOpen(false)
    }
  }, [device.isMobile, device.orientation, device.isClient, isClient])

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

      // Cerrar sidebar en móvil después de enviar
      if (isClient && device.isClient && device.isMobile) {
        setSidebarOpen(false)
      }
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
    // Cerrar sidebar en móvil después de crear chat
    if (isClient && device.isClient && device.isMobile) {
      setSidebarOpen(false)
    }
  }

  // Configuración responsiva para diferentes elementos
  const getResponsiveConfig = () => {
    // Valores por defecto seguros para SSR
    if (!isClient || !device.isClient) {
      return {
        headerPadding: "p-4",
        contentPadding: "px-4 py-4",
        inputPadding: "p-4",
        titleSize: "text-6xl md:text-9xl lg:text-[12rem]",
        subtitleSize: "text-xl md:text-3xl",
        cardPadding: "p-6",
        buttonSize: "h-12 w-12",
        iconSize: "h-6 w-6",
        maxWidth: "max-w-4xl",
        gridCols: "grid-cols-1 md:grid-cols-3",
        gap: "gap-4 md:gap-6",
        textSize: "text-sm md:text-lg",
        messageMaxWidth: "max-w-[90%] md:max-w-[85%]",
        messagePadding: "px-4 md:px-6 py-4 md:py-6",
        placeholder: "Pregúntale algo a JUANCHO desde el espacio...",
        logoSize: "w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64",
      }
    }

    if (device.isMobile) {
      return {
        headerPadding: "p-3",
        contentPadding: "px-3 py-4",
        inputPadding: "p-3",
        titleSize: "text-5xl md:text-7xl",
        subtitleSize: "text-lg md:text-2xl",
        cardPadding: "p-4",
        buttonSize: "h-11 w-11",
        iconSize: "h-5 w-5",
        maxWidth: "max-w-full",
        gridCols: "grid-cols-1",
        gap: "gap-3",
        textSize: "text-sm",
        messageMaxWidth: "max-w-[95%]",
        messagePadding: "px-3 py-3",
        placeholder: "Pregúntale a JUANCHO...",
        logoSize: "w-24 h-24 md:w-32 md:h-32",
      }
    } else if (device.isTablet) {
      return {
        headerPadding: "p-4",
        contentPadding: "px-4 py-6",
        inputPadding: "p-4",
        titleSize: "text-7xl md:text-8xl",
        subtitleSize: "text-xl md:text-2xl",
        cardPadding: "p-5",
        buttonSize: "h-12 w-12",
        iconSize: "h-5 w-5",
        maxWidth: "max-w-3xl",
        gridCols: "grid-cols-1 md:grid-cols-2",
        gap: "gap-4",
        textSize: "text-base",
        messageMaxWidth: "max-w-[90%]",
        messagePadding: "px-4 py-4",
        placeholder: "Pregúntale algo a JUANCHO...",
        logoSize: "w-40 h-40 md:w-48 md:h-48",
      }
    } else {
      return {
        headerPadding: "p-4 md:p-6",
        contentPadding: "px-4 py-4 md:py-8",
        inputPadding: "p-4 md:p-6",
        titleSize: "text-6xl md:text-9xl lg:text-[12rem]",
        subtitleSize: "text-xl md:text-3xl",
        cardPadding: "p-6",
        buttonSize: "h-12 w-12",
        iconSize: "h-6 w-6",
        maxWidth: "max-w-4xl",
        gridCols: "grid-cols-1 md:grid-cols-3",
        gap: "gap-4 md:gap-6",
        textSize: "text-sm md:text-lg",
        messageMaxWidth: "max-w-[90%] md:max-w-[85%]",
        messagePadding: "px-4 md:px-6 py-4 md:py-6",
        placeholder: "Pregúntale algo a JUANCHO desde el espacio...",
        logoSize: "w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80",
      }
    }
  }

  const config = getResponsiveConfig()

  const header = (
    <div className={cn("m-auto flex flex-col gap-8 md:gap-12 text-center", config.contentPadding, config.maxWidth)}>
      {/* Logo JUANCHO GIGANTE con efectos mejorados */}
      <div className="flex flex-col items-center gap-8 md:gap-12 relative z-0">
        <div className="relative z-0">
          {/* Aura galáctica GIGANTE alrededor del OVNI */}
          <div className="absolute -inset-12 md:-inset-16 lg:-inset-24 bg-gradient-to-r from-blue-400/15 via-purple-400/10 to-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -inset-8 md:-inset-12 lg:-inset-16 bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-cyan-500/20 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute -inset-4 md:-inset-6 lg:-inset-8 bg-gradient-to-r from-purple-500/25 via-blue-500/20 to-purple-500/25 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          
          {/* LOGO GIGANTE */}
          <div className={config.logoSize}>
            <AlienLogo className="w-full h-full" />
          </div>
          
          {/* Partículas orbitando MÁS GRANDES */}
          <div className="absolute -top-4 -right-4 w-4 h-4 md:w-6 md:h-6 bg-cyan-300 rounded-full animate-ping shadow-lg shadow-cyan-300/50"></div>
          <div
            className="absolute -bottom-4 -left-4 w-3 h-3 md:w-5 md:h-5 bg-purple-300 rounded-full animate-ping shadow-lg shadow-purple-300/50"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-4 -left-8 w-2 h-2 md:w-3 md:h-3 bg-blue-200 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute -top-6 left-6 w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-bounce"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <h1
            className={cn(
              "font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent drop-shadow-2xl tracking-tight relative z-10 animate-pulse",
              config.titleSize,
            )}
          >
            JUANCHO
          </h1>
          <div className="space-y-3 relative z-10">
            <p className={cn("text-green-100 font-semibold tracking-wide", config.subtitleSize)}>
              Asistente Espacial de IA
            </p>
            <div className={cn("flex items-center justify-center gap-2 md:gap-3 text-green-300", config.textSize)}>
              <Star className="w-4 h-4 md:w-5 md:h-5 text-green-400 animate-pulse" />
              <span className="font-medium">Explorando el universo del conocimiento</span>
              <Star className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Características glass verde mejoradas */}
      <div className={cn("grid", config.gridCols, config.gap)}>
        <div
          className={cn(
            "group bg-gradient-to-br from-green-900/30 via-green-900/20 to-green-800/30 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-green-500/40 shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 hover:border-green-400/60",
            config.cardPadding,
          )}
        >
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-xl md:rounded-2xl border border-green-400/30 group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-5 w-5 md:h-6 md:w-6 text-green-400 group-hover:text-green-300" />
            </div>
            <span className="font-bold text-green-300 text-base md:text-lg group-hover:text-green-200">
              Velocidad Luz
            </span>
          </div>
          <p className={cn("text-green-200 leading-relaxed font-medium group-hover:text-green-100", config.textSize)}>
            Respuestas instantáneas desde las estrellas más lejanas del cosmos
          </p>
          <div className="absolute top-2 right-2 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
        </div>

        <div
          className={cn(
            "group bg-gradient-to-br from-emerald-900/30 via-green-900/20 to-emerald-800/30 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-emerald-500/40 shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:border-emerald-400/60",
            config.cardPadding,
          )}
        >
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-gradient-to-br from-emerald-500/30 to-green-500/30 backdrop-blur-sm rounded-xl md:rounded-2xl border border-emerald-400/30 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-emerald-400 group-hover:text-emerald-300" />
            </div>
            <span className="font-bold text-emerald-300 text-base md:text-lg group-hover:text-emerald-200">
              IA Galáctica
            </span>
          </div>
          <p
            className={cn("text-emerald-200 leading-relaxed font-medium group-hover:text-emerald-100", config.textSize)}
          >
            Inteligencia de última generación alimentada por energía cósmica
          </p>
          <div className="absolute top-2 right-2 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
        </div>

        <div
          className={cn(
            "group bg-gradient-to-br from-green-900/30 via-emerald-900/20 to-green-800/30 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-green-500/40 shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 hover:border-green-400/60",
            config.cardPadding,
            device.isTablet && "md:col-span-2",
          )}
        >
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="p-2 md:p-3 bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-xl md:rounded-2xl border border-green-400/30 group-hover:scale-110 transition-transform duration-300\">

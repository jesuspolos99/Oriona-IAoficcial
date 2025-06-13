"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Chat {
  id: string
  title: string
  messages: Array<{ role: "user" | "assistant"; content: string }>
  createdAt: Date
  updatedAt: Date
}

interface ChatContextType {
  chats: Chat[]
  currentChatId: string | null
  currentChat: Chat | null
  createNewChat: () => string
  selectChat: (chatId: string) => void
  updateChatTitle: (chatId: string, title: string) => void
  deleteChat: (chatId: string) => void
  addMessageToChat: (chatId: string, message: { role: "user" | "assistant"; content: string }) => void
  clearCurrentChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider")
  }
  return context
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)

  // Cargar chats del localStorage al iniciar
  useEffect(() => {
    const savedChats = localStorage.getItem("oriona-chats")
    const savedCurrentChatId = localStorage.getItem("oriona-current-chat")

    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
      }))
      setChats(parsedChats)
    }

    if (savedCurrentChatId) {
      setCurrentChatId(savedCurrentChatId)
    }
  }, [])

  // Guardar chats en localStorage cuando cambien
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("oriona-chats", JSON.stringify(chats))
    }
  }, [chats])

  // Guardar chat actual en localStorage
  useEffect(() => {
    if (currentChatId) {
      localStorage.setItem("oriona-current-chat", currentChatId)
    }
  }, [currentChatId])

  const currentChat = chats.find((chat) => chat.id === currentChatId) || null

  const createNewChat = (): string => {
    const newChatId = crypto.randomUUID()
    const newChat: Chat = {
      id: newChatId,
      title: "Nueva Conversación Cósmica",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setChats((prev) => [newChat, ...prev])
    setCurrentChatId(newChatId)
    return newChatId
  }

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId)
  }

  const updateChatTitle = (chatId: string, title: string) => {
    setChats((prev) => prev.map((chat) => (chat.id === chatId ? { ...chat, title, updatedAt: new Date() } : chat)))
  }

  const deleteChat = (chatId: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId))
    if (currentChatId === chatId) {
      const remainingChats = chats.filter((chat) => chat.id !== chatId)
      setCurrentChatId(remainingChats.length > 0 ? remainingChats[0].id : null)
    }
  }

  const addMessageToChat = (chatId: string, message: { role: "user" | "assistant"; content: string }) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === chatId) {
          const updatedChat = {
            ...chat,
            messages: [...chat.messages, message],
            updatedAt: new Date(),
          }

          // Auto-generar título basado en el primer mensaje del usuario
          if (chat.title === "Nueva Conversación Cósmica" && message.role === "user") {
            const title = message.content.length > 50 ? message.content.substring(0, 50) + "..." : message.content
            updatedChat.title = title
          }

          return updatedChat
        }
        return chat
      }),
    )
  }

  const clearCurrentChat = () => {
    setCurrentChatId(null)
    localStorage.removeItem("oriona-current-chat")
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChatId,
        currentChat,
        createNewChat,
        selectChat,
        updateChatTitle,
        deleteChat,
        addMessageToChat,
        clearCurrentChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

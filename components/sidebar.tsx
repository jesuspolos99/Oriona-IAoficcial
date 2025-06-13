"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, MessageSquare, Settings, Palette, Rocket, Plus, Trash2, Edit3, LogOut, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlienLogo } from "@/components/alien-logo"
import { useChatContext } from "@/lib/chat-context"
import { Input } from "@/components/ui/input"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { chats, currentChatId, createNewChat, selectChat, updateChatTitle, deleteChat } = useChatContext()
  const [user, setUser] = useState<any>(null)
  const [editingChatId, setEditingChatId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error("Error fetching user:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.reload()
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const handleNewChat = () => {
    createNewChat()
    // Cerrar sidebar en móvil después de crear chat
    if (window.innerWidth < 768) {
      onToggle()
    }
  }

  const handleSelectChat = (chatId: string) => {
    selectChat(chatId)
    // Cerrar sidebar en móvil después de seleccionar chat
    if (window.innerWidth < 768) {
      onToggle()
    }
  }

  const handleEditChat = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId)
    setEditTitle(currentTitle)
  }

  const handleSaveEdit = () => {
    if (editingChatId && editTitle.trim()) {
      updateChatTitle(editingChatId, editTitle.trim())
    }
    setEditingChatId(null)
    setEditTitle("")
  }

  const handleCancelEdit = () => {
    setEditingChatId(null)
    setEditTitle("")
  }

  const handleDeleteChat = (chatId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta conversación?")) {
      deleteChat(chatId)
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Hace unos minutos"
    if (diffInHours < 24) return `Hace ${diffInHours}h`
    if (diffInHours < 48) return "Ayer"
    if (diffInHours < 168) return `Hace ${Math.floor(diffInHours / 24)} días`
    return `Hace ${Math.floor(diffInHours / 168)} semanas`
  }

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-green-900/20 backdrop-blur-xl border-r border-green-500/30 shadow-2xl z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header del sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-green-500/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <AlienLogo className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-green-100 font-semibold text-sm">{user?.name || "Usuario"}</h2>
              <p className="text-green-400 text-xs">{user?.email || "Cargando..."}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-green-400 hover:text-white hover:bg-green-800/50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Nuevo Chat */}
        <div className="p-4">
          <Button
            onClick={handleNewChat}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none shadow-lg backdrop-blur-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Conversación Cósmica
          </Button>
        </div>

        {/* Historial de chats */}
        <div className="flex-1 overflow-y-auto px-4">
          <h3 className="text-green-300 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
            <MessageSquare className="h-3 w-3" />
            Expediciones Recientes ({chats.length})
          </h3>

          {chats.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                <AlienLogo />
              </div>
              <p className="text-green-400 text-sm">No hay conversaciones aún</p>
              <p className="text-green-500 text-xs mt-1">¡Crea tu primera conversación cósmica!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200",
                    currentChatId === chat.id ? "bg-green-700/40 border border-green-500/40" : "hover:bg-green-800/30",
                  )}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full animate-pulse",
                      currentChatId === chat.id ? "bg-green-300" : "bg-emerald-400",
                    )}
                  ></div>

                  <div className="flex-1 min-w-0" onClick={() => handleSelectChat(chat.id)}>
                    {editingChatId === chat.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="h-6 text-xs bg-green-900/50 border-green-500/50 text-green-100"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveEdit()
                            if (e.key === "Escape") handleCancelEdit()
                          }}
                          autoFocus
                        />
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            className="h-5 px-2 text-xs bg-green-600 hover:bg-green-700"
                          >
                            Guardar
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancelEdit}
                            className="h-5 px-2 text-xs text-green-400 hover:text-white"
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-green-200 text-sm font-medium truncate">{chat.title}</p>
                        <div className="flex items-center gap-2 text-green-500 text-xs">
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(chat.updatedAt)}</span>
                          <span>•</span>
                          <span>{chat.messages.length} mensajes</span>
                        </div>
                      </>
                    )}
                  </div>

                  {editingChatId !== chat.id && (
                    <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-green-400 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditChat(chat.id, chat.title)
                        }}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-green-400 hover:text-red-400"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteChat(chat.id)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Menu de navegación */}
        <div className="p-4 border-t border-green-500/30">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-green-300 hover:text-white hover:bg-green-800/50"
              onClick={() => alert("Configuración próximamente 🛸")}
            >
              <Settings className="h-4 w-4 mr-3" />
              Configuración Galáctica
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-green-300 hover:text-white hover:bg-green-800/50"
              onClick={() => alert("Temas próximamente 🎨")}
            >
              <Palette className="h-4 w-4 mr-3" />
              Temas Cósmicos
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-green-300 hover:text-white hover:bg-green-800/50"
              onClick={() => alert("Funciones próximamente 🚀")}
            >
              <Rocket className="h-4 w-4 mr-3" />
              Explorar Funciones
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-red-300 hover:text-white hover:bg-red-800/50"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Footer con estadísticas */}
        <div className="p-4 bg-green-900/30 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-green-400 font-bold text-lg">{chats.length}</div>
              <div className="text-green-500 text-xs">Chats</div>
            </div>
            <div>
              <div className="text-emerald-400 font-bold text-lg">24/7</div>
              <div className="text-green-500 text-xs">Disponible</div>
            </div>
            <div>
              <div className="text-green-400 font-bold text-lg">🛸</div>
              <div className="text-green-500 text-xs">Velocidad</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useDeviceDetection } from "@/hooks/use-device-detection"
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
  const device = useDeviceDetection()
  const [isClient, setIsClient] = useState(false)
  const { chats, currentChatId, createNewChat, selectChat, updateChatTitle, deleteChat } = useChatContext()
  const [user, setUser] = useState<any>(null)
  const [editingChatId, setEditingChatId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")

  useEffect(() => {
    setIsClient(true)
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
    if (isClient && device.isClient && device.isMobile) {
      onToggle()
    }
  }

  const handleSelectChat = (chatId: string) => {
    selectChat(chatId)
    // Cerrar sidebar en móvil después de seleccionar chat
    if (isClient && device.isClient && device.isMobile) {
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

  // Configuración responsiva
  const getSidebarConfig = () => {
    // Valores por defecto seguros para SSR
    if (!isClient || !device.isClient) {
      return {
        width: "w-80",
        padding: "p-4",
        headerPadding: "p-4",
        contentPadding: "px-4",
        footerPadding: "p-4",
        textSize: "text-sm",
        titleSize: "text-sm",
        subtitleSize: "text-xs",
        buttonSize: "h-9",
        iconSize: "h-4 w-4",
        gap: "gap-3",
        logoSize: "w-6 h-6",
      }
    }

    if (device.isMobile) {
      return {
        width: "w-full",
        padding: "p-3",
        headerPadding: "p-3",
        contentPadding: "px-3",
        footerPadding: "p-3",
        textSize: "text-sm",
        titleSize: "text-sm",
        subtitleSize: "text-xs",
        buttonSize: "h-8",
        iconSize: "h-4 w-4",
        gap: "gap-2",
        logoSize: "w-5 h-5",
      }
    } else if (device.isTablet) {
      return {
        width: "w-80",
        padding: "p-4",
        headerPadding: "p-4",
        contentPadding: "px-4",
        footerPadding: "p-4",
        textSize: "text-sm",
        titleSize: "text-sm",
        subtitleSize: "text-xs",
        buttonSize: "h-9",
        iconSize: "h-4 w-4",
        gap: "gap-3",
        logoSize: "w-6 h-6",
      }
    } else {
      return {
        width: "w-80",
        padding: "p-4",
        headerPadding: "p-4",
        contentPadding: "px-4",
        footerPadding: "p-4",
        textSize: "text-sm",
        titleSize: "text-sm",
        subtitleSize: "text-xs",
        buttonSize: "h-9",
        iconSize: "h-4 w-4",
        gap: "gap-3",
        logoSize: "w-6 h-6",
      }
    }
  }

  const config = getSidebarConfig()

  return (
    <>
      {/* Overlay para móvil y tablet */}
      {isOpen && isClient && device.isClient && (device.isMobile || device.isTablet) && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onToggle}
          style={{ touchAction: "none" }} // Prevenir scroll del fondo
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-green-900/20 backdrop-blur-xl border-r border-green-500/30 shadow-2xl z-50 transition-transform duration-300 ease-in-out",
          config.width,
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header del sidebar */}
        <div
          className={cn(
            "flex items-center justify-between border-b border-green-500/30 relative z-10",
            config.headerPadding,
          )}
        >
          <div className={cn("flex items-center", config.gap)}>
            <div className="relative z-0">
              <AlienLogo className={cn("flex-shrink-0", config.logoSize)} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className={cn("text-green-100 font-semibold truncate", config.titleSize)}>
                {user?.name || "Usuario"}
              </h2>
              <p className={cn("text-green-400 truncate", config.subtitleSize)}>{user?.email || "Cargando..."}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn(
              "text-green-400 hover:text-white hover:bg-green-800/50 flex-shrink-0 z-10",
              config.buttonSize,
            )}
          >
            <X className={config.iconSize} />
          </Button>
        </div>

        {/* Nuevo Chat */}
        <div className={config.padding}>
          <Button
            onClick={handleNewChat}
            className={cn(
              "w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none shadow-lg backdrop-blur-sm",
              config.textSize,
            )}
          >
            <Plus className={cn("mr-2", config.iconSize)} />
            {device.isMobile ? "Nueva Conversación" : "Nueva Conversación Cósmica"}
          </Button>
        </div>

        {/* Historial de chats */}
        <div className={cn("flex-1 overflow-y-auto", config.contentPadding)}>
          <h3
            className={cn(
              "text-green-300 font-semibold uppercase tracking-wider mb-3 flex items-center",
              config.gap,
              config.subtitleSize,
            )}
          >
            <MessageSquare className="h-3 w-3" />
            Expediciones Recientes ({chats.length})
          </h3>

          {chats.length === 0 ? (
            <div className="text-center py-6 md:py-8">
              <div className={cn("mx-auto mb-4 opacity-50 relative z-0", device.isMobile ? "w-8 h-8" : "w-12 h-12")}>
                <AlienLogo />
              </div>
              <p className={cn("text-green-400", config.textSize)}>No hay conversaciones aún</p>
              <p className={cn("text-green-500 mt-1", config.subtitleSize)}>¡Crea tu primera conversación cósmica!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "group flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl cursor-pointer transition-all duration-200",
                    currentChatId === chat.id ? "bg-green-700/40 border border-green-500/40" : "hover:bg-green-800/30",
                    device.isTouchDevice && "active:bg-green-700/30",
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
                          className={cn(
                            "bg-green-900/50 border-green-500/50 text-green-100",
                            device.isMobile ? "h-6 text-xs" : "h-6 text-xs",
                          )}
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
                            className={cn(
                              "px-2 bg-green-600 hover:bg-green-700",
                              device.isMobile ? "h-5 text-xs" : "h-5 text-xs",
                            )}
                          >
                            Guardar
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancelEdit}
                            className={cn(
                              "px-2 text-green-400 hover:text-white",
                              device.isMobile ? "h-5 text-xs" : "h-5 text-xs",
                            )}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className={cn("text-green-200 font-medium truncate", config.textSize)}>{chat.title}</p>
                        <div className={cn("flex items-center gap-2 text-green-500", config.subtitleSize)}>
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
                        className={cn("p-0 text-green-400 hover:text-white", device.isMobile ? "h-6 w-6" : "h-6 w-6")}
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
                        className={cn("p-0 text-green-400 hover:text-red-400", device.isMobile ? "h-6 w-6" : "h-6 w-6")}
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
        <div className={cn("border-t border-green-500/30", config.padding)}>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-green-300 hover:text-white hover:bg-green-800/50",
                config.textSize,
              )}
              onClick={() => alert("Configuración próximamente 🛸")}
            >
              <Settings className={cn("mr-2 md:mr-3", config.iconSize)} />
              {device.isMobile ? "Configuración" : "Configuración Galáctica"}
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-green-300 hover:text-white hover:bg-green-800/50",
                config.textSize,
              )}
              onClick={() => alert("Temas próximamente 🎨")}
            >
              <Palette className={cn("mr-2 md:mr-3", config.iconSize)} />
              {device.isMobile ? "Temas" : "Temas Cósmicos"}
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-green-300 hover:text-white hover:bg-green-800/50",
                config.textSize,
              )}
              onClick={() => alert("Funciones próximamente 🚀")}
            >
              <Rocket className={cn("mr-2 md:mr-3", config.iconSize)} />
              {device.isMobile ? "Explorar" : "Explorar Funciones"}
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className={cn("w-full justify-start text-red-300 hover:text-white hover:bg-red-800/50", config.textSize)}
            >
              <LogOut className={cn("mr-2 md:mr-3", config.iconSize)} />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Footer con estadísticas */}
        <div className={cn("bg-green-900/30 backdrop-blur-sm", config.footerPadding)}>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className={cn("text-green-400 font-bold", device.isMobile ? "text-base" : "text-lg")}>
                {chats.length}
              </div>
              <div className={cn("text-green-500", config.subtitleSize)}>Chats</div>
            </div>
            <div>
              <div className={cn("text-emerald-400 font-bold", device.isMobile ? "text-base" : "text-lg")}>24/7</div>
              <div className={cn("text-green-500", config.subtitleSize)}>Disponible</div>
            </div>
            <div>
              <div className={cn("text-green-400 font-bold", device.isMobile ? "text-base" : "text-lg")}>🛸</div>
              <div className={cn("text-green-500", config.subtitleSize)}>Velocidad</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

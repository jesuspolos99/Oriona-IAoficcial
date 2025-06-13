"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, MessageSquare, Settings, Palette, Rocket, Plus, Trash2, Edit3, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlienLogo } from "@/components/alien-logo"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [chatHistory] = useState([
    { id: 1, title: "Exploración de Galaxias", time: "Hace 2h" },
    { id: 2, title: "Física Cuántica Explicada", time: "Ayer" },
    { id: 3, title: "Viaje a Marte", time: "Hace 3 días" },
    { id: 4, title: "Inteligencia Artificial", time: "Hace 1 semana" },
  ])

  const [user, setUser] = useState<any>(null)

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
          <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none shadow-lg backdrop-blur-sm">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Conversación Cósmica
          </Button>
        </div>

        {/* Historial de chats */}
        <div className="flex-1 overflow-y-auto px-4">
          <h3 className="text-green-300 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
            <MessageSquare className="h-3 w-3" />
            Expediciones Recientes
          </h3>
          <div className="space-y-2">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-green-800/30 cursor-pointer transition-all duration-200"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-green-200 text-sm font-medium truncate">{chat.title}</p>
                  <p className="text-green-500 text-xs">{chat.time}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-green-400 hover:text-white">
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-green-400 hover:text-red-400">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu de navegación */}
        <div className="p-4 border-t border-green-500/30">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-green-300 hover:text-white hover:bg-green-800/50"
            >
              <Settings className="h-4 w-4 mr-3" />
              Configuración Galáctica
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-green-300 hover:text-white hover:bg-green-800/50"
            >
              <Palette className="h-4 w-4 mr-3" />
              Temas Cósmicos
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-green-300 hover:text-white hover:bg-green-800/50"
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
              <div className="text-green-400 font-bold text-lg">∞</div>
              <div className="text-green-500 text-xs">Consultas</div>
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

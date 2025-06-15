"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlienAvatar } from "@/components/alien-avatar"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

interface LoginFormProps {
  onSuccess: () => void
  onSwitchToRegister: () => void
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión")
      }

      // Recargar la página para actualizar el estado de autenticación
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      <div className="bg-green-900/20 backdrop-blur-xl p-8 rounded-3xl border border-green-500/30 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            {/* CONEJO GIGANTE PARA EL LOGIN */}
            <AlienAvatar size="lg" className="relative z-0" />
          </div>
          <h1 className="text-3xl font-bold text-green-100 mb-2 relative z-10">Bienvenido de vuelta</h1>
          <p className="text-green-300 text-sm relative z-10">Accede a tu cuenta cósmica</p>
        </div>

        {/* Error */}
        {error && (
          <Alert className="mb-6 border-red-500/40 bg-red-900/20 relative z-10">
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <Label htmlFor="email" className="text-green-200 font-medium">
              Email Cósmico
            </Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400 z-10" />
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 bg-green-900/30 border-green-500/30 text-green-100 placeholder:text-green-400/60 focus:border-green-400 relative z-10"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-green-200 font-medium">
              Contraseña Galáctica
            </Label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400 z-10" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10 bg-green-900/30 border-green-500/30 text-green-100 placeholder:text-green-400/60 focus:border-green-400 relative z-10"
                placeholder="Tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300 z-10"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 rounded-xl transition-all duration-200 relative z-10"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión Cósmica"}
          </Button>
        </form>

        {/* Switch to register */}
        <div className="mt-6 text-center relative z-10">
          <p className="text-green-300 text-sm">
            ¿No tienes una cuenta?{" "}
            <button onClick={onSwitchToRegister} className="text-green-400 hover:text-green-300 font-medium underline">
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

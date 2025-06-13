"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlienLogo } from "@/components/alien-logo"
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react"

interface RegisterFormProps {
  onSuccess: () => void
  onSwitchToLogin: () => void
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al crear la cuenta")
      }

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-green-900/20 backdrop-blur-xl p-8 rounded-3xl border border-green-500/30 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <AlienLogo className="w-16 h-16" />
          </div>
          <h1 className="text-2xl font-bold text-green-100 mb-2">Únete a ORIONA</h1>
          <p className="text-green-300 text-sm">Crea tu cuenta cósmica</p>
        </div>

        {/* Error */}
        {error && (
          <Alert className="mb-6 border-red-500/40 bg-red-900/20">
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-green-200 font-medium">
              Nombre Completo
            </Label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-10 bg-green-900/30 border-green-500/30 text-green-100 placeholder:text-green-400/60 focus:border-green-400"
                placeholder="Tu nombre completo"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-green-200 font-medium">
              Email Cósmico
            </Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 bg-green-900/30 border-green-500/30 text-green-100 placeholder:text-green-400/60 focus:border-green-400"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-green-200 font-medium">
              Contraseña Galáctica
            </Label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10 bg-green-900/30 border-green-500/30 text-green-100 placeholder:text-green-400/60 focus:border-green-400"
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-green-200 font-medium">
              Confirmar Contraseña
            </Label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="pl-10 pr-10 bg-green-900/30 border-green-500/30 text-green-100 placeholder:text-green-400/60 focus:border-green-400"
                placeholder="Repite tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 rounded-xl transition-all duration-200"
          >
            {isLoading ? "Creando cuenta..." : "Crear Cuenta Cósmica"}
          </Button>
        </form>

        {/* Switch to login */}
        <div className="mt-6 text-center">
          <p className="text-green-300 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <button onClick={onSwitchToLogin} className="text-green-400 hover:text-green-300 font-medium underline">
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

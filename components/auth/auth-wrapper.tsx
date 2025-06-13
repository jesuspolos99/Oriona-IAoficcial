"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { CosmicBackground } from "@/components/cosmic-background"

interface AuthWrapperProps {
  children: React.ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      setIsAuthenticated(response.ok)
    } catch {
      setIsAuthenticated(false)
    }
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        <CosmicBackground />
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        <CosmicBackground />
        <div className="relative z-10 w-full">
          {authMode === "login" ? (
            <LoginForm onSuccess={() => setIsAuthenticated(true)} onSwitchToRegister={() => setAuthMode("register")} />
          ) : (
            <RegisterForm onSuccess={() => setAuthMode("login")} onSwitchToLogin={() => setAuthMode("login")} />
          )}
        </div>
      </div>
    )
  }

  return <>{children}</>
}

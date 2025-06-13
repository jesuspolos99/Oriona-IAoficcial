"use client"

import { cn } from "@/lib/utils"
import { useRef, useEffect, type TextareaHTMLAttributes } from "react"

interface AutoResizeTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> {
  value: string
  onChange: (value: string) => void
}

export function AutoResizeTextarea({ className, value, onChange, ...props }: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextarea = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      const scrollHeight = textarea.scrollHeight
      // Limitar altura máxima en móvil para mejor UX
      const maxHeight = window.innerWidth < 768 ? 120 : 200
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`
    }
  }

  useEffect(() => {
    resizeTextarea()
  }, [value])

  // Manejar el scroll en móvil cuando el textarea crece
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea && window.innerWidth < 768) {
      const handleFocus = () => {
        // Pequeño delay para que el teclado virtual se abra
        setTimeout(() => {
          textarea.scrollIntoView({ behavior: "smooth", block: "center" })
        }, 300)
      }

      textarea.addEventListener("focus", handleFocus)
      return () => textarea.removeEventListener("focus", handleFocus)
    }
  }, [])

  return (
    <textarea
      {...props}
      value={value}
      ref={textareaRef}
      rows={1}
      onChange={(e) => {
        onChange(e.target.value)
        resizeTextarea()
      }}
      className={cn(
        "resize-none min-h-4 overflow-hidden",
        // Mejoras específicas para móvil
        "touch-manipulation", // Mejora la respuesta táctil
        className,
      )}
      style={{
        // Prevenir zoom en iOS
        fontSize: window.innerWidth < 768 ? "16px" : undefined,
        ...props.style,
      }}
    />
  )
}

import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthWrapper } from "@/components/auth/auth-wrapper"
import { ChatProvider } from "@/lib/chat-context"
import type { ReactNode } from "react"

export const metadata = {
  title: "JUANCHO - Asistente Espacial de IA",
  description:
    "JUANCHO es tu compañero espacial de IA. Un conejo aventurero que vuela en su OVNI explorando el universo del conocimiento. Potenciado por Groq y Llama 3.1.",
  generator: "v0.dev",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
              font-feature-settings: 'kern' 1;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            h1, h2, h3 {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
              font-weight: 700;
            }
          `,
          }}
        />
      </head>
      <body className={cn("h-full bg-gray-900")}>
        <TooltipProvider delayDuration={0}>
          <AuthWrapper>
            <ChatProvider>{children}</ChatProvider>
          </AuthWrapper>
        </TooltipProvider>
      </body>
    </html>
  )
}

import "./globals.css"

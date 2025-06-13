"use client"

import type React from "react"

import { useDeviceDetection } from "@/hooks/use-device-detection"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ResponsiveLayoutProps {
  children: ReactNode
  className?: string
}

export function ResponsiveLayout({ children, className }: ResponsiveLayoutProps) {
  const device = useDeviceDetection()

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-300",
        // Clases base para cada dispositivo
        device.isMobile && "mobile-layout",
        device.isTablet && "tablet-layout",
        device.isDesktop && "desktop-layout",
        // Orientación
        device.orientation === "portrait" && "portrait-mode",
        device.orientation === "landscape" && "landscape-mode",
        // Sistema operativo
        device.isIOS && "ios-device",
        device.isAndroid && "android-device",
        // Touch device
        device.isTouchDevice && "touch-device",
        className,
      )}
      style={
        {
          // Variables CSS personalizadas para cada dispositivo
          "--device-width": `${device.width}px`,
          "--device-height": `${device.height}px`,
          "--sidebar-width": device.isMobile ? "100%" : device.isTablet ? "320px" : "280px",
          "--content-padding": device.isMobile ? "1rem" : device.isTablet ? "1.5rem" : "2rem",
          "--text-size": device.isMobile ? "14px" : device.isTablet ? "15px" : "16px",
          "--button-size": device.isMobile ? "44px" : device.isTablet ? "48px" : "40px",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}

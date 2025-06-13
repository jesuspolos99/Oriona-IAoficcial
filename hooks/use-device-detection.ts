"use client"

import { useState, useEffect } from "react"

export type DeviceType = "mobile" | "tablet" | "desktop"

interface DeviceInfo {
  type: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  width: number
  height: number
  orientation: "portrait" | "landscape"
  isTouchDevice: boolean
  isIOS: boolean
  isAndroid: boolean
  isClient: boolean
}

const getInitialDeviceInfo = (): DeviceInfo => ({
  type: "desktop",
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  width: 1920,
  height: 1080,
  orientation: "landscape",
  isTouchDevice: false,
  isIOS: false,
  isAndroid: false,
  isClient: false,
})

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(getInitialDeviceInfo)

  useEffect(() => {
    const detectDevice = () => {
      // Verificar que estamos en el cliente
      if (typeof window === "undefined") return

      const width = window.innerWidth
      const height = window.innerHeight
      const userAgent = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : ""

      // Detectar tipo de dispositivo por ancho de pantalla
      let type: DeviceType = "desktop"
      if (width < 768) {
        type = "mobile"
      } else if (width < 1024) {
        type = "tablet"
      }

      // Detectar orientación
      const orientation: "portrait" | "landscape" = width < height ? "portrait" : "landscape"

      // Detectar si es dispositivo táctil
      const isTouchDevice =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0))

      // Detectar sistema operativo móvil
      const isIOS = /ipad|iphone|ipod/.test(userAgent)
      const isAndroid = /android/.test(userAgent)

      // Ajustar tipo basado en user agent para tablets específicas
      if (type === "desktop" && (isIOS || isAndroid) && isTouchDevice) {
        type = "tablet"
      }

      // iPad específico (puede reportar desktop width pero es tablet)
      if (/ipad/.test(userAgent) || (isIOS && width >= 768)) {
        type = "tablet"
      }

      setDeviceInfo({
        type,
        isMobile: type === "mobile",
        isTablet: type === "tablet",
        isDesktop: type === "desktop",
        width,
        height,
        orientation,
        isTouchDevice,
        isIOS,
        isAndroid,
        isClient: true,
      })
    }

    // Detectar al cargar (solo en cliente)
    detectDevice()

    // Detectar al cambiar tamaño de ventana
    const handleResize = () => {
      detectDevice()
    }

    const handleOrientationChange = () => {
      // Pequeño delay para que la orientación se actualice completamente
      setTimeout(detectDevice, 100)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleOrientationChange)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleOrientationChange)
    }
  }, [])

  return deviceInfo
}

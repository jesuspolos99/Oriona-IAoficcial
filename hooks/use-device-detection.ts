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
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
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
  })

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const userAgent = navigator.userAgent.toLowerCase()

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
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

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
      })
    }

    // Detectar al cargar
    detectDevice()

    // Detectar al cambiar tamaño de ventana
    window.addEventListener("resize", detectDevice)
    window.addEventListener("orientationchange", detectDevice)

    return () => {
      window.removeEventListener("resize", detectDevice)
      window.removeEventListener("orientationchange", detectDevice)
    }
  }, [])

  return deviceInfo
}

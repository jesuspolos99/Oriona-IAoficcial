"use client"

import { useEffect, useState } from "react"

export function CosmicBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradiente base del espacio */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-green-900/10 via-transparent to-emerald-900/10"></div>

      {/* Luna grande */}
      <div
        className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-gray-300/40 to-gray-500/40 blur-sm animate-pulse"
        style={{
          top: "15%",
          right: "8%",
          animationDuration: "4s",
        }}
      >
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-200/30 to-gray-400/30"></div>
        {/* Cráteres lunares */}
        <div className="absolute top-4 left-6 w-3 h-3 bg-gray-600/40 rounded-full"></div>
        <div className="absolute top-8 right-8 w-2 h-2 bg-gray-600/30 rounded-full"></div>
        <div className="absolute bottom-6 left-8 w-4 h-4 bg-gray-600/35 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-gray-600/40 rounded-full"></div>
      </div>

      {/* Planeta distante */}
      <div
        className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30"
        style={{
          top: "60%",
          left: "5%",
        }}
      >
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-400/40 to-purple-400/40"></div>
        {/* Anillos planetarios */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-1 bg-gradient-to-r from-transparent via-blue-300/20 to-transparent rounded-full rotate-12"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-300/15 to-transparent rounded-full rotate-12"></div>
      </div>

      {/* Planeta pequeño verde */}
      <div
        className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-green-500/40 to-emerald-500/40"
        style={{
          top: "75%",
          right: "25%",
        }}
      >
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-green-400/50 to-emerald-400/50"></div>
        <div className="absolute top-2 left-2 w-2 h-2 bg-green-300/60 rounded-full"></div>
        <div className="absolute bottom-1 right-2 w-1 h-1 bg-emerald-300/60 rounded-full"></div>
      </div>

      {/* Meteoritos en movimiento */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`meteor-${i}`}
          className="absolute w-1 h-8 bg-gradient-to-b from-orange-400/60 to-transparent rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${45 + Math.random() * 90}deg)`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-300/80 rounded-full blur-sm"></div>
        </div>
      ))}

      {/* Cometa */}
      <div
        className="absolute w-2 h-2 bg-cyan-400/80 rounded-full animate-bounce"
        style={{
          top: "30%",
          left: "20%",
          animationDuration: "6s",
        }}
      >
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-12 h-0.5 bg-gradient-to-r from-cyan-400/60 to-transparent rounded-full"></div>
        <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 translate-y-0.5 w-8 h-0.5 bg-gradient-to-r from-cyan-300/40 to-transparent rounded-full"></div>
      </div>

      {/* Estrellas animadas */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Constelaciones */}
      <div className="absolute top-20 right-20 opacity-40">
        <div className="relative">
          <div className="absolute w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-4 left-6"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-8 left-2"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-6 left-8"></div>
          {/* Líneas de constelación */}
          <div className="absolute top-0.5 left-0.5 w-6 h-0.5 bg-gradient-to-r from-white/30 to-transparent transform rotate-45"></div>
          <div className="absolute top-4.5 left-6.5 w-4 h-0.5 bg-gradient-to-r from-white/30 to-transparent transform -rotate-45"></div>
        </div>
      </div>

      {/* Nebulosa */}
      <div
        className="absolute w-64 h-64 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl animate-pulse"
        style={{
          top: "40%",
          right: "30%",
          animationDuration: "8s",
        }}
      ></div>

      {/* Galaxia espiral distante */}
      <div
        className="absolute w-24 h-24 opacity-20"
        style={{
          top: "20%",
          left: "15%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full transform rotate-45"></div>
        <div className="absolute inset-2 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-full transform -rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/40 rounded-full"></div>
      </div>

      {/* Partículas de polvo cósmico */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`dust-${i}`}
          className="absolute bg-green-300/20 rounded-full animate-float"
          style={{
            width: `${0.5 + Math.random()}px`,
            height: `${0.5 + Math.random()}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Satélite artificial */}
      <div
        className="absolute w-3 h-2 bg-gray-400/60 rounded-sm animate-pulse"
        style={{
          top: "45%",
          right: "15%",
          animationDuration: "3s",
        }}
      >
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gray-300/40"></div>
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gray-300/40"></div>
        <div className="absolute top-0 left-1 w-0.5 h-0.5 bg-red-400/80 rounded-full animate-ping"></div>
      </div>

      {/* Estación espacial */}
      <div
        className="absolute w-4 h-4 opacity-60"
        style={{
          top: "65%",
          left: "70%",
        }}
      >
        <div className="absolute inset-0 bg-gray-300/40 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gray-400/50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-gray-400/50"></div>
        <div className="absolute top-0 left-0 w-1 h-1 bg-blue-400/60 rounded-full animate-ping"></div>
      </div>

      {/* Auroras espaciales */}
      <div
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-400/5 via-emerald-400/3 to-transparent animate-pulse"
        style={{ animationDuration: "6s" }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-purple-400/5 via-pink-400/3 to-transparent animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-15px) translateX(3px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

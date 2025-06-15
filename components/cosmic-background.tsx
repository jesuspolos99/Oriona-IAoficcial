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
      {/* Gradientes base del espacio profundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-green-900/10 via-transparent to-emerald-900/10"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/5 via-transparent to-purple-900/5"></div>

      {/* Vía Láctea */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-12 blur-sm"></div>

      {/* LUNA GRANDE CON BANDERA DE COLOMBIA */}
      <div
        className="absolute w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-gray-200/50 to-gray-400/50 blur-sm animate-pulse"
        style={{
          top: "10%",
          right: "5%",
          animationDuration: "6s",
        }}
      >
        {/* Superficie lunar detallada */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-100/40 to-gray-300/40"></div>

        {/* Cráteres lunares más detallados */}
        <div className="absolute top-8 left-12 w-6 h-6 bg-gray-600/40 rounded-full">
          <div className="absolute inset-1 bg-gray-700/30 rounded-full"></div>
        </div>
        <div className="absolute top-16 right-16 w-4 h-4 bg-gray-600/30 rounded-full">
          <div className="absolute inset-1 bg-gray-700/20 rounded-full"></div>
        </div>
        <div className="absolute bottom-12 left-16 w-8 h-8 bg-gray-600/35 rounded-full">
          <div className="absolute inset-2 bg-gray-700/25 rounded-full"></div>
        </div>
        <div className="absolute bottom-8 right-8 w-3 h-3 bg-gray-600/40 rounded-full"></div>
        <div className="absolute top-12 left-8 w-2 h-2 bg-gray-600/30 rounded-full"></div>

        {/* Mares lunares */}
        <div className="absolute top-6 right-12 w-12 h-8 bg-gray-700/20 rounded-full blur-sm"></div>
        <div className="absolute bottom-16 left-12 w-8 h-6 bg-gray-700/15 rounded-full blur-sm"></div>

        {/* BANDERA DE COLOMBIA EN LA LUNA */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Asta de la bandera */}
          <div className="absolute w-1 h-16 md:h-20 lg:h-24 bg-gray-400/80 rounded-full shadow-lg"></div>

          {/* Bandera ondeando */}
          <div
            className="absolute left-1 -top-2 w-12 h-8 md:w-16 md:h-10 lg:w-20 lg:h-12 shadow-2xl animate-pulse"
            style={{
              background:
                "linear-gradient(to bottom, #FFDE00 0%, #FFDE00 50%, #003893 50%, #003893 75%, #CE1126 75%, #CE1126 100%)",
              borderRadius: "0 4px 4px 0",
              animationDuration: "3s",
            }}
          >
            {/* Efecto de ondeo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse rounded-r"></div>

            {/* Sombra de la bandera */}
            <div className="absolute -bottom-1 -right-1 w-full h-full bg-black/20 rounded-r blur-sm -z-10"></div>
          </div>

          {/* Placa conmemorativa */}
          <div className="absolute top-16 md:top-20 lg:top-24 left-0 w-8 h-4 md:w-10 md:h-5 bg-gray-300/60 rounded border border-gray-400/40">
            <div className="absolute inset-0.5 bg-gray-200/40 rounded text-xs flex items-center justify-center">
              <span className="text-gray-800/80 font-bold text-[6px] md:text-[8px]">COL</span>
            </div>
          </div>
        </div>

        {/* Brillo especial alrededor de la bandera */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-yellow-400/10 rounded-full blur-xl animate-pulse"></div>
      </div>

      {/* Planeta Júpiter con bandas */}
      <div
        className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30"
        style={{
          top: "60%",
          left: "5%",
        }}
      >
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-orange-400/40 to-red-400/40"></div>
        {/* Bandas de Júpiter */}
        <div className="absolute top-2 left-0 right-0 h-1 bg-orange-600/30 rounded-full"></div>
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-red-600/20 rounded-full"></div>
        <div className="absolute bottom-3 left-0 right-0 h-1 bg-orange-700/25 rounded-full"></div>
        {/* Gran Mancha Roja */}
        <div className="absolute bottom-4 right-3 w-3 h-2 bg-red-500/40 rounded-full"></div>
      </div>

      {/* Saturno con anillos detallados */}
      <div
        className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-500/30 to-orange-500/30"
        style={{
          top: "25%",
          left: "75%",
        }}
      >
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-400/40 to-orange-400/40"></div>
        {/* Sistema de anillos múltiples */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-300/25 to-transparent rounded-full rotate-12"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-0.5 bg-gradient-to-r from-transparent via-orange-300/20 to-transparent rounded-full rotate-12"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-0.5 bg-gradient-to-r from-transparent via-yellow-200/15 to-transparent rounded-full rotate-12"></div>
        {/* División de Cassini */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-30 h-0.5 bg-gray-900/40 rounded-full rotate-12"></div>
      </div>

      {/* Planeta verde alienígena */}
      <div
        className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-green-500/40 to-emerald-500/40"
        style={{
          top: "75%",
          right: "25%",
        }}
      >
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-green-400/50 to-emerald-400/50"></div>
        {/* Continentes alienígenas */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-green-300/60 rounded-full"></div>
        <div className="absolute bottom-1 right-2 w-1 h-1 bg-emerald-300/60 rounded-full"></div>
        <div className="absolute top-1 right-1 w-1.5 h-1 bg-green-400/50 rounded-full"></div>
        {/* Atmósfera */}
        <div className="absolute -inset-0.5 rounded-full bg-green-400/10 blur-sm"></div>
      </div>

      {/* Planeta azul oceánico */}
      <div
        className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/35 to-cyan-500/35"
        style={{
          top: "40%",
          right: "60%",
        }}
      >
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-400/45 to-cyan-400/45"></div>
        {/* Océanos y continentes */}
        <div className="absolute top-1 left-2 w-3 h-2 bg-green-600/40 rounded-full"></div>
        <div className="absolute bottom-2 right-1 w-2 h-2 bg-green-600/35 rounded-full"></div>
        {/* Nubes */}
        <div className="absolute top-2 right-2 w-2 h-1 bg-white/20 rounded-full blur-sm"></div>
        <div className="absolute bottom-3 left-1 w-1.5 h-0.5 bg-white/15 rounded-full blur-sm"></div>
      </div>

      {/* Meteoritos en movimiento con estelas */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`meteor-${i}`}
          className="absolute animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${45 + Math.random() * 90}deg)`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div className="w-1 h-8 bg-gradient-to-b from-orange-400/60 to-transparent rounded-full">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-300/80 rounded-full blur-sm"></div>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-yellow-300/60 rounded-full blur-sm"></div>
          </div>
        </div>
      ))}

      {/* Cometas múltiples */}
      <div
        className="absolute w-2 h-2 bg-cyan-400/80 rounded-full animate-bounce"
        style={{
          top: "30%",
          left: "20%",
          animationDuration: "6s",
        }}
      >
        <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-cyan-400/60 to-transparent rounded-full"></div>
        <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 translate-y-0.5 w-12 h-0.5 bg-gradient-to-r from-cyan-300/40 to-transparent rounded-full"></div>
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 translate-y-1 w-8 h-0.5 bg-gradient-to-r from-blue-300/30 to-transparent rounded-full"></div>
      </div>

      <div
        className="absolute w-1.5 h-1.5 bg-purple-400/80 rounded-full animate-bounce"
        style={{
          top: "70%",
          right: "30%",
          animationDuration: "8s",
          animationDelay: "2s",
        }}
      >
        <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-12 h-0.5 bg-gradient-to-l from-purple-400/60 to-transparent rounded-full"></div>
        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 translate-y-0.5 w-8 h-0.5 bg-gradient-to-l from-purple-300/40 to-transparent rounded-full"></div>
      </div>

      {/* Estrellas con diferentes tipos */}
      {Array.from({ length: 80 }).map((_, i) => {
        const size = Math.random()
        const isGiant = size > 0.8
        const isBinary = size > 0.9

        return (
          <div
            key={`star-${i}`}
            className={`absolute rounded-full animate-pulse ${
              isGiant ? "bg-red-300" : isBinary ? "bg-blue-300" : "bg-white"
            }`}
            style={{
              width: `${isGiant ? 3 : isBinary ? 2 : 1 + Math.random() * 2}px`,
              height: `${isGiant ? 3 : isBinary ? 2 : 1 + Math.random() * 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            {isBinary && (
              <div className="absolute w-1 h-1 bg-red-300 rounded-full" style={{ top: "1px", left: "3px" }} />
            )}
          </div>
        )
      })}

      {/* Constelaciones detalladas */}
      <div className="absolute top-20 right-20 opacity-40">
        <div className="relative">
          {/* Osa Mayor */}
          <div className="absolute w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-4 left-6"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-8 left-2"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-6 left-8"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-2 left-12"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-10 left-10"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-12 left-6"></div>
          {/* Líneas de constelación */}
          <div className="absolute top-0.5 left-0.5 w-6 h-0.5 bg-gradient-to-r from-white/30 to-transparent transform rotate-45"></div>
          <div className="absolute top-4.5 left-6.5 w-4 h-0.5 bg-gradient-to-r from-white/30 to-transparent transform -rotate-45"></div>
          <div className="absolute top-8.5 left-2.5 w-6 h-0.5 bg-gradient-to-r from-white/30 to-transparent transform rotate-12"></div>
        </div>
      </div>

      {/* Orión */}
      <div className="absolute bottom-32 left-16 opacity-30">
        <div className="relative">
          <div className="absolute w-1 h-1 bg-blue-300 rounded-full"></div>
          <div className="absolute w-1 h-1 bg-red-300 rounded-full top-6 left-2"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-12 left-1"></div>
          <div className="absolute w-1 h-1 bg-blue-300 rounded-full top-3 left-4"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-9 left-5"></div>
          {/* Cinturón de Orión */}
          <div className="absolute top-6 left-1 w-1 h-1 bg-blue-400 rounded-full"></div>
          <div className="absolute top-6 left-3 w-1 h-1 bg-blue-400 rounded-full"></div>
          <div className="absolute top-6 left-5 w-1 h-1 bg-blue-400 rounded-full"></div>
        </div>
      </div>

      {/* Nebulosas múltiples */}
      <div
        className="absolute w-64 h-64 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl animate-pulse"
        style={{
          top: "40%",
          right: "30%",
          animationDuration: "8s",
        }}
      ></div>

      <div
        className="absolute w-48 h-48 bg-gradient-to-br from-green-500/8 via-emerald-500/4 to-transparent rounded-full blur-2xl animate-pulse"
        style={{
          top: "60%",
          left: "40%",
          animationDuration: "10s",
          animationDelay: "3s",
        }}
      ></div>

      <div
        className="absolute w-32 h-32 bg-gradient-to-br from-blue-500/8 via-cyan-500/4 to-transparent rounded-full blur-xl animate-pulse"
        style={{
          top: "20%",
          left: "60%",
          animationDuration: "12s",
          animationDelay: "1s",
        }}
      ></div>

      {/* Galaxia espiral detallada */}
      <div
        className="absolute w-24 h-24 opacity-20"
        style={{
          top: "20%",
          left: "15%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full transform rotate-45"></div>
        <div className="absolute inset-2 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-full transform -rotate-45"></div>
        <div className="absolute inset-4 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full transform rotate-90"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-300/40 rounded-full blur-sm"></div>
        {/* Brazos espirales */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-full rotate-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full rotate-150"></div>
      </div>

      {/* Agujero negro con disco de acreción */}
      <div
        className="absolute w-8 h-8 opacity-60"
        style={{
          top: "80%",
          left: "80%",
        }}
      >
        <div className="absolute inset-0 bg-black rounded-full"></div>
        <div
          className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 via-yellow-500/20 to-orange-500/30 rounded-full blur-sm animate-spin"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute -inset-1 bg-gradient-to-r from-red-500/40 via-orange-500/30 to-red-500/40 rounded-full blur-xs animate-spin"
          style={{ animationDuration: "2s" }}
        ></div>
      </div>

      {/* Satélites y estaciones espaciales */}
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
        <div
          className="absolute bottom-0 right-1 w-0.5 h-0.5 bg-green-400/80 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Estación espacial internacional */}
      <div
        className="absolute w-4 h-4 opacity-60"
        style={{
          top: "65%",
          left: "70%",
        }}
      >
        <div className="absolute inset-0 bg-gray-300/40 rounded-sm"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gray-400/50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-gray-400/50"></div>
        {/* Paneles solares */}
        <div className="absolute -left-2 top-0 w-4 h-1 bg-blue-400/40"></div>
        <div className="absolute -right-2 top-0 w-4 h-1 bg-blue-400/40"></div>
        <div className="absolute -left-2 bottom-0 w-4 h-1 bg-blue-400/40"></div>
        <div className="absolute -right-2 bottom-0 w-4 h-1 bg-blue-400/40"></div>
        <div className="absolute top-0 left-0 w-1 h-1 bg-blue-400/60 rounded-full animate-ping"></div>
      </div>

      {/* Nave espacial alienígena */}
      <div
        className="absolute w-6 h-3 opacity-70 animate-pulse"
        style={{
          top: "35%",
          left: "85%",
          animationDuration: "5s",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/50 to-emerald-400/50 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-1 bg-green-300/60 rounded-full"></div>
        {/* Luces de la nave */}
        <div className="absolute top-0 left-1 w-0.5 h-0.5 bg-green-400 rounded-full animate-ping"></div>
        <div
          className="absolute top-0 right-1 w-0.5 h-0.5 bg-emerald-400 rounded-full animate-ping"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-ping"
          style={{ animationDelay: "0.6s" }}
        ></div>
      </div>

      {/* Partículas de polvo cósmico mejoradas */}
      {Array.from({ length: 30 }).map((_, i) => (
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

      {/* Auroras espaciales mejoradas */}
      <div
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-400/8 via-emerald-400/4 to-transparent animate-pulse"
        style={{ animationDuration: "6s" }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-purple-400/8 via-pink-400/4 to-transparent animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-blue-400/6 via-cyan-400/3 to-transparent animate-pulse"
        style={{ animationDuration: "10s" }}
      ></div>

      {/* Rayos cósmicos */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`ray-${i}`}
          className="absolute w-0.5 h-32 bg-gradient-to-b from-white/30 to-transparent animate-pulse"
          style={{
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        />
      ))}

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

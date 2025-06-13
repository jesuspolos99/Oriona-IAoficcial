"use client"

export function AlienAvatar({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  const innerSizes = {
    sm: { head: "w-8 h-8", body: "w-6 h-8", eyes: "w-1.5 h-1.5", antenna: "h-2" },
    md: { head: "w-12 h-12", body: "w-8 h-10", eyes: "w-2 h-2", antenna: "h-3" },
    lg: { head: "w-16 h-16", body: "w-12 h-14", eyes: "w-3 h-3", antenna: "h-4" },
  }

  const s = innerSizes[size]

  return (
    <div className={`${className} ${sizes[size]} relative`}>
      {/* Aura galáctica sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-lg animate-pulse"></div>

      {/* Cuerpo principal */}
      <div className="relative bg-gradient-to-b from-green-400/90 to-green-500/90 rounded-full p-2 shadow-lg border border-green-300/30 backdrop-blur-sm">
        {/* Cabeza alienígena */}
        <div
          className={`${s.head} bg-gradient-to-b from-green-300/95 to-green-400/95 rounded-full mx-auto relative border border-green-200/20`}
        >
          {/* Ojos grandes expresivos */}
          <div className="flex justify-center gap-1 pt-2">
            <div className={`${s.eyes} bg-black rounded-full relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 to-black"></div>
              <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full animate-ping"></div>
              <div className="absolute bottom-0 right-0 w-0.5 h-0.5 bg-green-300 rounded-full"></div>
            </div>
            <div className={`${s.eyes} bg-black rounded-full relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 to-black"></div>
              <div
                className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full animate-ping"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div className="absolute bottom-0 right-0 w-0.5 h-0.5 bg-green-300 rounded-full"></div>
            </div>
          </div>

          {/* Antenas con cristales */}
          <div className="absolute -top-1 left-1/4 w-0.5 bg-green-400 rounded-full" style={{ height: s.antenna }}>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full animate-bounce border border-green-200/40">
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="absolute -top-1 right-1/4 w-0.5 bg-green-400 rounded-full" style={{ height: s.antenna }}>
            <div
              className="absolute -top-1 -left-1 w-2 h-2 bg-gradient-to-br from-emerald-300 to-green-300 rounded-full animate-bounce border border-green-200/40"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Detalles faciales */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-0.5 bg-green-600/60 rounded-full"></div>
          <div className="flex justify-center gap-0.5 absolute bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="w-0.5 h-0.5 bg-green-600/40 rounded-full"></div>
            <div className="w-0.5 h-0.5 bg-green-600/40 rounded-full"></div>
          </div>
        </div>

        {/* Cuerpo alienígena */}
        <div
          className={`${s.body} bg-gradient-to-b from-green-400/85 to-green-500/85 rounded-full mx-auto -mt-1 border border-green-300/20 relative`}
        >
          {/* Brazos articulados */}
          <div className="absolute top-2 -left-2 w-4 h-1 bg-green-400/70 rounded-full rotate-45 origin-right">
            <div className="absolute -right-1 -top-0.5 w-2 h-2 bg-green-300/80 rounded-full border border-green-200/30">
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white/60 rounded-full"></div>
            </div>
          </div>
          <div className="absolute top-2 -right-2 w-4 h-1 bg-green-400/70 rounded-full -rotate-45 origin-left">
            <div className="absolute -left-1 -top-0.5 w-2 h-2 bg-green-300/80 rounded-full border border-green-200/30">
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white/60 rounded-full"></div>
            </div>
          </div>

          {/* Detalles del pecho */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-1 bg-green-600/30 rounded-full"></div>
            <div className="w-1 h-0.5 bg-green-600/40 rounded-full mx-auto mt-0.5"></div>
          </div>
        </div>

        {/* Piernas */}
        <div className="absolute -bottom-1 left-1/3 w-1 h-2 bg-green-500/70 rounded-full"></div>
        <div className="absolute -bottom-1 right-1/3 w-1 h-2 bg-green-500/70 rounded-full"></div>
      </div>

      {/* Partículas mágicas */}
      <div className="absolute -top-1 -right-1 w-1 h-1 bg-green-300 rounded-full animate-ping"></div>
      <div className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-emerald-300 rounded-full animate-pulse"></div>
      <div className="absolute top-1 -left-2 w-0.5 h-0.5 bg-green-200 rounded-full animate-bounce"></div>
    </div>
  )
}

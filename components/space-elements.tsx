"use client"

export function SpaceElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Planeta principal flotante - estático */}
      <div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-green-500/20 via-green-400/15 to-emerald-500/20 blur-sm"
        style={{
          top: "20%",
          right: "10%",
        }}
      >
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-green-400/30 to-emerald-400/25 blur-xs"></div>
        <div className="absolute top-4 left-6 w-3 h-3 bg-white/40 rounded-full"></div>
        <div className="absolute bottom-6 right-4 w-2 h-2 bg-emerald-300/60 rounded-full"></div>
      </div>

      {/* Planeta pequeño - estático */}
      <div
        className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-green-500/20"
        style={{
          top: "60%",
          left: "5%",
        }}
      >
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-emerald-400/40 to-green-400/30"></div>
      </div>

      {/* Marcianito flotante - estático */}
      <div
        className="absolute w-12 h-16"
        style={{
          top: "40%",
          left: "15%",
        }}
      >
        {/* Cuerpo del marciano */}
        <div className="w-8 h-10 bg-gradient-to-b from-green-400/40 to-green-500/40 rounded-full mx-auto">
          {/* Cabeza */}
          <div className="w-6 h-6 bg-gradient-to-b from-green-300/50 to-green-400/50 rounded-full mx-auto -mt-2">
            {/* Ojos */}
            <div className="flex justify-center gap-1 pt-1">
              <div className="w-1.5 h-1.5 bg-white/80 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white/80 rounded-full"></div>
            </div>
          </div>
          {/* Brazos */}
          <div className="absolute top-4 -left-2 w-4 h-1 bg-green-400/40 rounded-full rotate-45"></div>
          <div className="absolute top-4 -right-2 w-4 h-1 bg-green-400/40 rounded-full -rotate-45"></div>
        </div>
      </div>

      {/* Nave espacial - estática */}
      <div
        className="absolute w-20 h-8"
        style={{
          top: "25%",
          right: "25%",
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-gray-400/30 to-gray-500/30 rounded-full relative">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gradient-to-r from-green-400/40 to-emerald-400/40 rounded-full"></div>
          <div className="absolute -bottom-1 left-2 w-2 h-3 bg-green-400/40 rounded-full"></div>
          <div className="absolute -bottom-1 right-2 w-2 h-3 bg-green-400/40 rounded-full"></div>
        </div>
      </div>

      {/* Asteroide - estático */}
      <div
        className="absolute w-10 h-10 bg-gradient-to-br from-gray-600/30 to-gray-700/30 rounded-lg rotate-45"
        style={{
          top: "70%",
          right: "30%",
        }}
      >
        <div className="absolute top-1 left-1 w-2 h-2 bg-gray-500/40 rounded-full"></div>
        <div className="absolute bottom-1 right-1 w-1 h-1 bg-gray-400/40 rounded-full"></div>
      </div>

      {/* Estrellas estáticas */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/60 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Nebulosa de fondo estática */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-900/3 via-emerald-900/3 to-green-800/3"></div>
    </div>
  )
}

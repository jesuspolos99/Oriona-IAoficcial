"use client"

export function AlienAvatar({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" | "xl" }) {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-32 h-32", // MUCHO MÁS GRANDE para el login
    xl: "w-48 h-48", // GIGANTE para casos especiales
  }

  const innerSizes = {
    sm: { ovni: "w-8 h-4", cupula: "w-6 h-3", conejo: "w-4 h-4", orejas: "h-2" },
    md: { ovni: "w-12 h-6", cupula: "w-8 h-4", conejo: "w-6 h-6", orejas: "h-3" },
    lg: { ovni: "w-24 h-12", cupula: "w-20 h-10", conejo: "w-16 h-16", orejas: "h-8" }, // MÁS GRANDE
    xl: { ovni: "w-32 h-16", cupula: "w-28 h-14", conejo: "w-24 h-24", orejas: "h-12" }, // GIGANTE
  }

  const s = innerSizes[size]

  return (
    <div className={`${className} ${sizes[size]} relative`}>
      {/* Aura cósmica sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-lg animate-pulse"></div>

      {/* OVNI principal */}
      <div className="relative bg-gradient-to-b from-gray-300/90 to-gray-500/90 rounded-full p-2 shadow-lg border border-gray-300/30 backdrop-blur-sm">
        {/* Cúpula transparente */}
        <div
          className={`absolute -top-2 left-1/2 transform -translate-x-1/2 ${s.cupula} bg-gradient-to-b from-cyan-300/60 to-blue-400/60 rounded-t-full border border-cyan-200/40`}
        >
          {/* Reflejos */}
          <div className="absolute top-0.5 left-1 w-1 h-0.5 bg-white/70 rounded-full blur-xs"></div>
        </div>

        {/* Conejo piloto - MUCHO MÁS GRANDE */}
        <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 ${s.conejo}`}>
          {/* Cabeza del conejo - MÁS GRANDE */}
          <div
            className={`${size === "lg" ? "w-8 h-8" : size === "xl" ? "w-12 h-12" : "w-3 h-3"} bg-gradient-to-b from-orange-200/95 to-orange-300/95 rounded-full mx-auto relative border border-orange-100/30`}
          >
            {/* Orejas largas - MÁS GRANDES */}
            <div
              className={`absolute -top-2 left-0 ${size === "lg" ? "w-2 h-8" : size === "xl" ? "w-3 h-12" : "w-0.5 h-2"} bg-gradient-to-t from-orange-200/80 to-orange-100/80 rounded-full rotate-15 border border-orange-100/20`}
            ></div>
            <div
              className={`absolute -top-2 right-0 ${size === "lg" ? "w-2 h-8" : size === "xl" ? "w-3 h-12" : "w-0.5 h-2"} bg-gradient-to-t from-orange-200/80 to-orange-100/80 rounded-full -rotate-15 border border-orange-100/20`}
            ></div>

            {/* Interior rosado de orejas - MÁS VISIBLE */}
            <div
              className={`absolute -top-1.5 left-0.5 ${size === "lg" ? "w-1 h-4" : size === "xl" ? "w-1.5 h-6" : "w-0.5 h-1"} bg-pink-300/70 rounded-full rotate-15`}
            ></div>
            <div
              className={`absolute -top-1.5 right-0.5 ${size === "lg" ? "w-1 h-4" : size === "xl" ? "w-1.5 h-6" : "w-0.5 h-1"} bg-pink-300/70 rounded-full -rotate-15`}
            ></div>

            {/* Ojos expresivos - MÁS GRANDES */}
            <div className="flex justify-center gap-0.5 pt-0.5">
              <div
                className={`${size === "lg" ? "w-2 h-2" : size === "xl" ? "w-3 h-3" : "w-0.5 h-0.5"} bg-black rounded-full relative border border-gray-800`}
              >
                <div
                  className={`absolute top-0 left-0 ${size === "lg" ? "w-1 h-1" : size === "xl" ? "w-1.5 h-1.5" : "w-0.5 h-0.5"} bg-white rounded-full animate-ping`}
                ></div>
                <div className="absolute bottom-0 right-0 w-0.5 h-0.5 bg-blue-300/60 rounded-full"></div>
              </div>
              <div
                className={`${size === "lg" ? "w-2 h-2" : size === "xl" ? "w-3 h-3" : "w-0.5 h-0.5"} bg-black rounded-full relative border border-gray-800`}
              >
                <div
                  className={`absolute top-0 left-0 ${size === "lg" ? "w-1 h-1" : size === "xl" ? "w-1.5 h-1.5" : "w-0.5 h-0.5"} bg-white rounded-full animate-ping`}
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div className="absolute bottom-0 right-0 w-0.5 h-0.5 bg-blue-300/60 rounded-full"></div>
              </div>
            </div>

            {/* Nariz rosada - MÁS GRANDE */}
            <div
              className={`absolute bottom-0.5 left-1/2 transform -translate-x-1/2 ${size === "lg" ? "w-1 h-1" : size === "xl" ? "w-1.5 h-1.5" : "w-0.5 h-0.5"} bg-pink-400 rounded-full border border-pink-300`}
            ></div>

            {/* Bigotes - MÁS VISIBLES */}
            <div
              className={`absolute bottom-0.5 left-0 ${size === "lg" ? "w-3 h-0.5" : size === "xl" ? "w-4 h-1" : "w-1 h-0.5"} bg-gray-600/50 rounded-full`}
            ></div>
            <div
              className={`absolute bottom-0.5 right-0 ${size === "lg" ? "w-3 h-0.5" : size === "xl" ? "w-4 h-1" : "w-1 h-0.5"} bg-gray-600/50 rounded-full`}
            ></div>

            {/* Sonrisa del conejo */}
            <div
              className={`absolute bottom-0.5 left-1/2 transform -translate-x-1/2 ${size === "lg" ? "w-2 h-0.5" : size === "xl" ? "w-3 h-1" : "w-1 h-0.5"} bg-pink-500/60 rounded-full`}
            ></div>
          </div>

          {/* Cuerpo pequeño - MÁS GRANDE */}
          <div
            className={`${size === "lg" ? "w-6 h-4" : size === "xl" ? "w-8 h-6" : "w-2 h-1.5"} bg-gradient-to-b from-orange-200/85 to-orange-300/85 rounded-full mx-auto mt-0.5 border border-orange-100/20`}
          >
            {/* Brazos controlando - MÁS VISIBLES */}
            <div
              className={`absolute top-1 -left-0.5 ${size === "lg" ? "w-2 h-1" : size === "xl" ? "w-3 h-1.5" : "w-1 h-0.5"} bg-orange-200/70 rounded-full rotate-45 border border-orange-100/30`}
            ></div>
            <div
              className={`absolute top-1 -right-0.5 ${size === "lg" ? "w-2 h-1" : size === "xl" ? "w-3 h-1.5" : "w-1 h-0.5"} bg-orange-200/70 rounded-full -rotate-45 border border-orange-100/30`}
            ></div>

            {/* Manos del conejo */}
            <div
              className={`absolute top-0.5 -left-1 ${size === "lg" ? "w-1.5 h-1.5" : size === "xl" ? "w-2 h-2" : "w-1 h-1"} bg-orange-100/80 rounded-full border border-orange-200/40`}
            ></div>
            <div
              className={`absolute top-0.5 -right-1 ${size === "lg" ? "w-1.5 h-1.5" : size === "xl" ? "w-2 h-2" : "w-1 h-1"} bg-orange-100/80 rounded-full border border-orange-200/40`}
            ></div>
          </div>
        </div>

        {/* Base del OVNI */}
        <div
          className={`${s.ovni} bg-gradient-to-b from-gray-400/85 to-gray-600/85 rounded-full mx-auto relative border border-gray-300/30`}
        >
          {/* Luces parpadeantes - MÁS GRANDES */}
          <div
            className={`absolute top-0.5 left-1 ${size === "lg" ? "w-1.5 h-1.5" : size === "xl" ? "w-2 h-2" : "w-0.5 h-0.5"} bg-cyan-400 rounded-full animate-ping shadow-lg shadow-cyan-400/50`}
          ></div>
          <div
            className={`absolute top-0.5 right-1 ${size === "lg" ? "w-1.5 h-1.5" : size === "xl" ? "w-2 h-2" : "w-0.5 h-0.5"} bg-blue-400 rounded-full animate-ping shadow-lg shadow-blue-400/50`}
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${size === "lg" ? "w-1.5 h-1.5" : size === "xl" ? "w-2 h-2" : "w-0.5 h-0.5"} bg-purple-400 rounded-full animate-ping shadow-lg shadow-purple-400/50`}
            style={{ animationDelay: "0.6s" }}
          ></div>

          {/* Anillo central */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent rounded-full"></div>
        </div>

        {/* Rayo tractor */}
        <div
          className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${size === "lg" ? "w-8 h-6" : size === "xl" ? "w-12 h-8" : "w-4 h-3"} bg-gradient-to-b from-cyan-400/30 to-transparent rounded-b-full animate-pulse`}
        >
          <div
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${size === "lg" ? "w-4 h-3" : size === "xl" ? "w-6 h-4" : "w-2 h-1.5"} bg-gradient-to-b from-blue-400/20 to-transparent rounded-b-full`}
          ></div>
        </div>
      </div>

      {/* Partículas mágicas - MÁS GRANDES */}
      <div
        className={`absolute -top-1 -right-1 ${size === "lg" ? "w-2 h-2" : size === "xl" ? "w-3 h-3" : "w-1 h-1"} bg-cyan-300 rounded-full animate-ping shadow-lg shadow-cyan-300/50`}
      ></div>
      <div
        className={`absolute -bottom-1 -left-1 ${size === "lg" ? "w-1.5 h-1.5" : size === "xl" ? "w-2 h-2" : "w-0.5 h-0.5"} bg-purple-300 rounded-full animate-pulse shadow-lg shadow-purple-300/50`}
      ></div>
      <div
        className={`absolute top-1 -left-2 ${size === "lg" ? "w-1 h-1" : size === "xl" ? "w-1.5 h-1.5" : "w-0.5 h-0.5"} bg-blue-200 rounded-full animate-bounce`}
      ></div>
    </div>
  )
}

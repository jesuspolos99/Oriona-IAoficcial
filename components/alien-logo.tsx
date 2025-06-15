"use client"

export function AlienLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative">
        {/* Efectos de brillo azul/púrpura para el OVNI */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 to-blue-600/15 rounded-full blur-lg animate-pulse scale-105"></div>

        {/* OVNI base */}
        <div className="relative bg-gradient-to-b from-gray-300/80 to-gray-500/80 backdrop-blur-sm p-4 md:p-6 rounded-full shadow-lg border border-gray-300/20">
          {/* Cúpula del OVNI */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-6 md:w-16 md:h-8 bg-gradient-to-b from-cyan-300/70 to-blue-400/70 rounded-t-full border border-cyan-200/30 backdrop-blur-sm">
            {/* Reflejos en la cúpula */}
            <div className="absolute top-1 left-2 w-2 h-1 bg-white/60 rounded-full blur-sm"></div>
            <div className="absolute top-2 right-3 w-1 h-0.5 bg-cyan-200/80 rounded-full"></div>
          </div>

          {/* Conejo piloto dentro de la cúpula */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-10 md:h-10">
            {/* Cabeza del conejo */}
            <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-b from-orange-200/90 to-orange-300/90 rounded-full mx-auto relative">
              {/* Orejas largas del conejo */}
              <div className="absolute -top-3 left-0 w-1 h-4 md:h-5 bg-gradient-to-t from-orange-200/80 to-orange-100/80 rounded-full rotate-12"></div>
              <div className="absolute -top-3 right-0 w-1 h-4 md:h-5 bg-gradient-to-t from-orange-200/80 to-orange-100/80 rounded-full -rotate-12"></div>

              {/* Interior rosado de las orejas */}
              <div className="absolute -top-2.5 left-0.5 w-0.5 h-2 md:h-3 bg-pink-300/60 rounded-full rotate-12"></div>
              <div className="absolute -top-2.5 right-0.5 w-0.5 h-2 md:h-3 bg-pink-300/60 rounded-full -rotate-12"></div>

              {/* Ojos del conejo */}
              <div className="flex justify-center gap-1 pt-1">
                <div className="w-1 h-1 bg-black rounded-full relative">
                  <div className="absolute top-0 left-0 w-0.5 h-0.5 bg-white rounded-full animate-ping"></div>
                </div>
                <div className="w-1 h-1 bg-black rounded-full relative">
                  <div
                    className="absolute top-0 left-0 w-0.5 h-0.5 bg-white rounded-full animate-ping"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                </div>
              </div>

              {/* Nariz del conejo */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-pink-400 rounded-full"></div>

              {/* Bigotes */}
              <div className="absolute bottom-0.5 left-0 w-2 h-0.5 bg-gray-600/40 rounded-full"></div>
              <div className="absolute bottom-0.5 right-0 w-2 h-0.5 bg-gray-600/40 rounded-full"></div>
            </div>

            {/* Cuerpo pequeño del conejo */}
            <div className="w-3 h-2 md:w-4 md:h-3 bg-gradient-to-b from-orange-200/80 to-orange-300/80 rounded-full mx-auto mt-0.5">
              {/* Brazos del conejo controlando el OVNI */}
              <div className="absolute top-2 -left-1 w-2 h-0.5 bg-orange-200/70 rounded-full rotate-45"></div>
              <div className="absolute top-2 -right-1 w-2 h-0.5 bg-orange-200/70 rounded-full -rotate-45"></div>
            </div>
          </div>

          {/* Base del OVNI con detalles */}
          <div className="w-8 h-4 md:w-12 md:h-6 bg-gradient-to-b from-gray-400/80 to-gray-600/80 rounded-full mx-auto relative">
            {/* Luces del OVNI */}
            <div className="absolute top-1 left-1 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
            <div
              className="absolute top-1 right-1 w-1 h-1 bg-blue-400 rounded-full animate-ping"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full animate-ping"
              style={{ animationDelay: "0.6s" }}
            ></div>

            {/* Anillo central del OVNI */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 md:w-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent rounded-full"></div>
          </div>

          {/* Rayo tractor debajo del OVNI */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-b from-cyan-400/30 to-transparent rounded-b-full animate-pulse">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-gradient-to-b from-blue-400/20 to-transparent rounded-b-full"></div>
          </div>
        </div>

        {/* Partículas espaciales alrededor */}
        <div className="absolute -top-2 -right-2 w-1 h-1 md:w-2 md:h-2 bg-cyan-300 rounded-full animate-ping"></div>
        <div className="absolute -bottom-1 -left-2 w-1 h-1 bg-purple-300 rounded-full animate-pulse"></div>
        <div className="absolute top-1 -left-3 w-0.5 h-0.5 bg-blue-200 rounded-full animate-bounce"></div>

        {/* Estela del OVNI */}
        <div className="absolute top-1/2 -right-4 w-3 h-0.5 bg-gradient-to-r from-cyan-400/60 to-transparent rounded-full animate-pulse"></div>
        <div
          className="absolute top-1/2 -right-3 w-2 h-0.5 bg-gradient-to-r from-blue-400/40 to-transparent rounded-full animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  )
}

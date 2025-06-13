"use client"

export function AlienLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative">
        {/* Efectos de brillo verde - reducidos */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl animate-pulse scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/15 to-green-600/15 rounded-full blur-lg animate-pulse scale-105"></div>

        {/* Cuerpo del marciano */}
        <div className="relative bg-gradient-to-b from-green-400/80 to-green-500/80 backdrop-blur-sm p-4 md:p-6 rounded-full shadow-lg border border-green-300/20">
          {/* Cabeza grande */}
          <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-b from-green-300/90 to-green-400/90 rounded-full mx-auto relative backdrop-blur-sm border border-green-200/15">
            {/* Ojos grandes */}
            <div className="flex justify-center gap-1 md:gap-2 pt-1 md:pt-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-black rounded-full relative">
                <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 md:w-1 md:h-1 bg-white rounded-full animate-ping"></div>
              </div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-black rounded-full relative">
                <div
                  className="absolute top-0.5 left-0.5 w-0.5 h-0.5 md:w-1 md:h-1 bg-white rounded-full animate-ping"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            </div>

            {/* Antenas */}
            <div className="absolute -top-1 left-1/4 w-0.5 h-2 bg-green-400 rounded-full">
              <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-green-300 rounded-full animate-bounce"></div>
            </div>
            <div className="absolute -top-1 right-1/4 w-0.5 h-2 bg-green-400 rounded-full">
              <div
                className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-green-300 rounded-full animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
          </div>

          {/* Cuerpo pequeño */}
          <div className="w-6 h-8 md:w-8 md:h-10 bg-gradient-to-b from-green-400/80 to-green-500/80 rounded-full mx-auto -mt-1 backdrop-blur-sm border border-green-300/15">
            {/* Brazos */}
            <div className="absolute top-4 md:top-6 -left-2 md:-left-3 w-4 h-0.5 md:w-6 md:h-1 bg-green-400/70 rounded-full rotate-45 backdrop-blur-sm"></div>
            <div className="absolute top-4 md:top-6 -right-2 md:-right-3 w-4 h-0.5 md:w-6 md:h-1 bg-green-400/70 rounded-full -rotate-45 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* Partículas verdes flotantes - reducidas */}
        <div className="absolute -top-2 -right-2 w-1 h-1 md:w-2 md:h-2 bg-green-300 rounded-full animate-ping"></div>
        <div className="absolute -bottom-1 -left-2 w-1 h-1 bg-emerald-300 rounded-full animate-pulse"></div>
        <div className="absolute top-1 -left-3 w-0.5 h-0.5 bg-green-200 rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}

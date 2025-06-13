"use client"

export function AlienLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative">
        {/* Efectos de brillo verde */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/40 to-emerald-500/40 rounded-full blur-2xl animate-pulse scale-150"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-green-600/30 rounded-full blur-xl animate-pulse scale-125"></div>

        {/* Cuerpo del marciano */}
        <div className="relative bg-gradient-to-b from-green-400/90 to-green-500/90 backdrop-blur-sm p-6 md:p-8 rounded-full shadow-2xl border border-green-300/30">
          {/* Cabeza grande */}
          <div className="w-12 h-12 md:w-16 md:w-16 bg-gradient-to-b from-green-300/95 to-green-400/95 rounded-full mx-auto relative backdrop-blur-sm border border-green-200/20">
            {/* Ojos grandes */}
            <div className="flex justify-center gap-2 pt-2 md:pt-3">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-full relative">
                <div className="absolute top-0.5 left-0.5 w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-ping"></div>
              </div>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-full relative">
                <div
                  className="absolute top-0.5 left-0.5 w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-ping"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            </div>

            {/* Antenas */}
            <div className="absolute -top-2 left-1/4 w-0.5 h-3 bg-green-400 rounded-full">
              <div className="absolute -top-1 -left-0.5 w-1.5 h-1.5 bg-green-300 rounded-full animate-bounce"></div>
            </div>
            <div className="absolute -top-2 right-1/4 w-0.5 h-3 bg-green-400 rounded-full">
              <div
                className="absolute -top-1 -left-0.5 w-1.5 h-1.5 bg-green-300 rounded-full animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
          </div>

          {/* Cuerpo pequeño */}
          <div className="w-8 h-10 md:w-10 md:h-12 bg-gradient-to-b from-green-400/90 to-green-500/90 rounded-full mx-auto -mt-2 backdrop-blur-sm border border-green-300/20">
            {/* Brazos */}
            <div className="absolute top-6 md:top-8 -left-3 md:-left-4 w-6 h-1 md:w-8 md:h-1.5 bg-green-400/80 rounded-full rotate-45 backdrop-blur-sm"></div>
            <div className="absolute top-6 md:top-8 -right-3 md:-right-4 w-6 h-1 md:w-8 md:h-1.5 bg-green-400/80 rounded-full -rotate-45 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* Partículas verdes flotantes */}
        <div className="absolute -top-3 -right-3 w-2 h-2 md:w-3 md:h-3 bg-green-300 rounded-full animate-ping"></div>
        <div className="absolute -bottom-2 -left-4 w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-300 rounded-full animate-pulse"></div>
        <div className="absolute top-2 -left-6 w-1 h-1 bg-green-200 rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}

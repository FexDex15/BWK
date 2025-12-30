// CommunityLayout.tsx
export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col community-root">
      {/* Fondo de imagen */}
      <div
        className="
          absolute inset-0
          bg-[url('/imgs/boywithuke-tobi.png')]
          bg-cover bg-center
          blur-sm brightness-90
          scale-105
          z-0
          pointer-events-none
        "
        aria-hidden
      />

      {/* Overlay traslúcido */}
      <div
        className="
          absolute inset-0
          bg-black/20
          backdrop-blur-sm
          z-10
          pointer-events-none
        "
        aria-hidden
      />

      {/* Contenido principal */}
      <div
        className="
          relative z-20
          flex-1 flex flex-col
          px-4 sm:px-6 md:px-12
          py-6 sm:py-8
          w-full
          max-w-7xl
          mx-auto
        "
      >
        {children}
      </div>
    </div>
  );
}

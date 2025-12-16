import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer" className="relative mt-32 overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(96,165,250,0.25), rgba(2,6,23,0.95) 70%)",
        }}
      />

      {/* Glow superior */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/25 blur-[150px] rounded-full" />

      {/* Divider */}
      <hr className="relative z-10 w-11/12 mx-auto border-blue-400/20" />

      {/* Contenido */}
      <section className="relative z-10 container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-10 text-white/70">
        
        {/* Logo */}
        <div className="col-span-full xl:col-span-2">
          <a
            href="/"
            className="flex items-center gap-3 font-semibold text-xl text-white/85 hover:text-white transition"
          >
            <LogoIcon />
            BoyWithUke
          </a>

          <p className="mt-4 max-w-sm text-sm text-white/50 leading-relaxed">
            Music, thoughts and feelings shared by fans.
          </p>
        </div>

        {/* Redes BoyWithUke */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-white/80">
            BoyWithUke
          </h3>

          <a href="#" className="text-sm opacity-60 hover:opacity-100 transition">
            Spotify
          </a>
          <a href="#" className="text-sm opacity-60 hover:opacity-100 transition">
            YouTube
          </a>
          <a href="#" className="text-sm opacity-60 hover:opacity-100 transition">
            Instagram
          </a>
        </div>

        {/* Tus redes (placeholder) */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-white/60">
            Contact
          </h3>

          <span className="text-sm text-white/40">—</span>
          <span className="text-sm text-white/40">—</span>
          <span className="text-sm text-white/40">—</span>
        </div>

        {/* Extra 1 */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-white/60">
            Explore
          </h3>

          <span className="text-sm text-white/40">—</span>
          <span className="text-sm text-white/40">—</span>
          <span className="text-sm text-white/40">—</span>
        </div>

        {/* Extra 2 */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-white/60">
            More
          </h3>

          <span className="text-sm text-white/40">—</span>
          <span className="text-sm text-white/40">—</span>
          <span className="text-sm text-white/40">—</span>
        </div>
      </section>

      {/* Bottom */}
      <section className="relative z-10 container pb-14 text-center text-white/40 text-sm">
        Fan-made project • Not affiliated with BoyWithUke . Even if I wanted it
      </section>
    </footer>
  );
};

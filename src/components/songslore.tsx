import React from "react";


interface LoreItem {
  title: string;
  year: string;
  description: string;
  side: "left" | "right";
  image?: string;
}

const lore: LoreItem[] = [
  {
    title: "Blurry Nights",
    year: "2021",
    side: "left",
    description:
      "La canción narra la historia de alguien que descubre que el amor que le prometieron era una ilusión. Entre noches borrosas llenas de confusión y tristeza, el protagonista enfrenta la traición, la soledad y sus propios pensamientos oscuros.",
  },
  {
    title: "Letter for My Bed",
    year: "2021",
    side: "right",
    description:
      "Una carta escrita desde el cansancio y la tristeza. La cama se vuelve símbolo de escape, consuelo y soledad.",
  },
  {
    title: "Route 9",
    year: "2021",
    side: "left",
    description:
      "Un viaje por la Route 9 intentando escapar de la mente. La carretera representa huida, miedo y súplica de no ser abandonado.",
  },
  {
    title: "Two Moons",
    year: "2021",
    side: "right",
    description:
      "Dos personas que se aman pero ya no orbitan igual. Nostalgia y la tristeza suave de dejar ir algo hermoso.",
  },
];

export const SongsLore: React.FC = () => {
  return (
    <section className="relative min-h-screen px-6 py-24 text-white overflow-hidden">

      {/* Fondo */}
      <div className="absolute inset-0 bg-[#0a0a0a]
        [background-image:radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.3),transparent_50%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.3),transparent_50%),linear-gradient(90deg,rgba(168,85,247,0.1),rgba(0,0,0,0.9),rgba(168,85,247,0.1))]
        bg-fixed z-0"
      />

      {/* Neon overlay */}
      <div className="pointer-events-none fixed inset-0 z-[1] hidden lg:block">
        <span className="neon-line left" />
        <span className="neon-line center" />
        <span className="neon-line right" />

        <div className="neon-sign">LORE</div>
      </div>

      {/* Título */}
      <h2 className="relative z-10 text-4xl font-bold text-center mb-24
        drop-shadow-[0_0_20px_rgba(179,0,255,0.9)]">
        📜 Lore de las canciones de BoyWithUke
      </h2>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto z-10">

        {/* Línea central */}
        <div className="absolute left-1/2 top-0 h-full w-[4px]
          bg-gradient-to-b from-violet-500 to-purple-900
          shadow-[0_0_25px_rgba(179,0,255,0.9)]
          -translate-x-1/2 hidden md:block"
        />

        <div className="space-y-24">
          {lore.map((item, index) => {
            const isLeft = item.side === "left";

            return (
              <div
                key={index}
                className={`relative flex w-full ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Punto */}
                <span
                  className="absolute top-10 md:left-1/2
                    w-4 h-4 rounded-full bg-violet-500
                    shadow-[0_0_20px_rgba(179,0,255,1)]
                    -translate-x-1/2"
                />

                {/* Card */}
                <div
                  className={`relative max-w-md w-full
                    bg-white/10 backdrop-blur-xl
                    border border-fuchsia-500/40
                    rounded-2xl p-6
                    shadow-[0_0_25px_rgba(179,0,255,0.5)]
                    hover:shadow-[0_0_40px_rgba(179,0,255,0.9)]
                    transition-all duration-300
                    hover:-translate-y-2
                    ${isLeft ? "md:mr-auto md:text-right" : "md:ml-auto"}
                  `}
                >
                  <h3 className="text-lg font-bold mb-2
                    text-white drop-shadow-[0_0_12px_rgba(179,0,255,0.8)]">
                    {item.title} ({item.year})
                  </h3>

                  <p className="text-sm text-white/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

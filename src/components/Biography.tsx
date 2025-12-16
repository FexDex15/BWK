// Biography.tsx
import React from "react";

export const Biography: React.FC = () => {
  return (
    <main
      className="relative z-10 min-h-screen px-4 py-24"
      style={{
        background: `radial-gradient(circle at top left, rgba(15,18,27,0.85) 40%, rgba(7,7,7,0.85) 100%),
                     url('data:image/jpeg;base64,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') center/125% auto no-repeat fixed`,
        filter: "brightness(1.45) contrast(1.2) saturate(1.1)",
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <section className="flex flex-wrap items-center justify-between bg-[rgba(15,15,30,0.7)] border border-cyan-500/40 rounded-2xl p-10 shadow-[0_0_50px_rgba(0,255,255,0.6)] backdrop-blur-md">
          <div className="flex-1 min-w-[300px] text-white">
         <h1 className="text-4xl font-bold">
         <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(0,234,255,1)]">
          BoyWithUke
          </span>{" "}
          <span className="text-pink-400 drop-shadow-[0_0_18px_rgba(148,0,211,0.95)]">
          (Charley Yang)
          </span>
          </h1>
       
            <p className="mt-4 text-lg text-white/90">
              Un artista que convirtió su vulnerabilidad en un lenguaje universal a través de cuerdas, máscaras y melodías que sanan.
            </p>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-z-HXg3jVbmm7Kl3WO1HgXs-CTXLlTo9_TQ&s"
            alt="BoyWithUke"
            className="w-72 rounded-lg shadow-[0_0_50px_rgba(0,255,255,0.8)] transition-transform duration-300 hover:scale-105 hover:brightness-125"
          />
        </section>

        {/* Info Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {[
            { title: "Nombre real", value: "Charley Yang" },
            { title: "Fecha de nacimiento", value: "25 de agosto de 2002" },
            { title: "Origen", value: "Daegu, Corea del Sur / Massachusetts, EE.UU." },
            { title: "Género", value: "Indie Pop · Alt Pop · Folk Moderno" },
            { title: "Instrumentos", value: "Ukelele · Guitarra · Piano · Voz" },
            { title: "Activo desde", value: "2020 – Presente" },
          ].map(({ title, value }) => (
            <div
              key={title}
              className="bg-gradient-to-br from-cyan-50/10 to-pink-200/15 border border-cyan-500/40 rounded-lg p-5 text-center shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:translate-y-[-4px] hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] transition-transform"
            >
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-white/80 mt-1">{value}</p>
            </div>
          ))}
        </section>

        {/* Bio Sections */}
        <section className="mt-16 space-y-10">
          {/* Inicios */}
          <div className="bg-[rgba(10,10,20,0.75)] border-l-4 border-cyan-500 rounded-lg p-6 shadow-[0_0_30px_rgba(0,255,255,0.5)]">
            <h2 className="text-cyan-400 text-2xl font-bold mb-3 drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]">
              Inicios y formación
            </h2>
            <p className="text-white/90 leading-relaxed">
              Charley Yang nació en Corea del Sur y creció en Massachusetts. Desde temprana edad mostró un talento innato para la música: aprendió piano, guitarra y violín antes de descubrir su instrumento más emblemático, el ukelele. Su infancia estuvo marcada por la timidez y una profunda introspección que más tarde transformaría en arte.
            </p>
            <p className="text-white/90 leading-relaxed mt-2">
              Durante su adolescencia comenzó a experimentar con GarageBand en un iPad, grabando melodías lo-fi y compartiéndolas en línea. Su capacidad para crear canciones sinceras con pocos recursos definió su identidad sonora desde el inicio.
            </p>
          </div>

          {/* Ascenso */}
          <div className="bg-gradient-to-r from-cyan-200/20 to-pink-200/20 border-l-4 border-cyan-500 rounded-lg p-6 shadow-[0_0_30px_rgba(0,255,255,0.5)]">
            <h2 className="text-cyan-400 text-2xl font-bold mb-3 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
              El nacimiento de BoyWithUke
            </h2>
            <p className="text-white/90 leading-relaxed">
              En 2020, bajo el nombre artístico <strong>BoyWithUke</strong>, Charley empezó a subir videos cortos a TikTok. Su serie “Minute-Long Songs” se volvió viral gracias a su combinación de letras honestas, melodías dulces y un toque de melancolía. En 2021, su sencillo <strong>"Toxic"</strong> se convirtió en fenómeno global, alcanzando más de 600 millones de reproducciones en Spotify y ubicándose en las listas de Billboard.
            </p>
            <p className="text-white/90 leading-relaxed mt-2">
              Lo que diferenciaba a BoyWithUke no era solo su sonido, sino su máscara LED: un símbolo de anonimato y de la ansiedad que lo acompañó gran parte de su vida. Esa decisión estética se transformó en un mensaje: “No necesitas mostrarte para ser escuchado”.
            </p>
          </div>

          {/* Estilo musical */}
          <div className="bg-[rgba(10,10,20,0.75)] border-l-4 border-cyan-500 rounded-lg p-6 shadow-[0_0_30px_rgba(0,255,255,0.5)]">
            <h2 className="text-cyan-400 text-2xl font-bold mb-3 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
              Estilo musical y mensaje
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 text-white/90 leading-relaxed">
                Su música mezcla la simpleza acústica del ukelele con capas de sintetizadores, percusión digital y arreglos introspectivos. Canciones como <em>“Two Moons”</em>, <em>“Sick of U”</em> o <em>“IDGAF”</em> exploran temas de amor no correspondido, autoconfianza y salud mental.  
                <br />
                Con el tiempo, Charley amplió su sonido hacia un pop alternativo más maduro, integrando guitarras eléctricas y una producción más cinematográfica. Su discografía narra un viaje desde la soledad hasta la autoaceptación.
              </div>
              <div className="bg-[rgba(0,0,0,0.5)] border border-cyan-500 rounded-lg p-6 text-center text-cyan-400 italic shadow-[0_0_25px_rgba(0,255,255,0.5)]">
                “Mi música no busca fama, busca conexión.”<br /><span className="not-italic">— BoyWithUke</span>
              </div>
            </div>
          </div>
        </section>

        {/* Puedes agregar Discografía, Timeline y Curiosidades igual con líneas azules más brillantes usando border-cyan-500 y sombras intensas */}
      </div>
    </main>
  );
};

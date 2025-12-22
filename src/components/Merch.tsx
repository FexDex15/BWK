import { useState } from "react";

interface MerchItem {
  title: string;
  desc: string;
  img: string;
  hoverImg?: string;
  link: string;
}

const merchItems: MerchItem[] = [
  {
    title: "KING OF NOTHING HOODIE",
    desc: "Diseño exclusivo de BoyWithUke",
    img: "https://boywithukemusic.com/cdn/shop/files/720HOODIEFRONT_c1ed8d6b-748d-48ba-97c1-f8e99ed9ccac.png?v=1728518072&width=823",
    hoverImg:
      "https://boywithukemusic.com/cdn/shop/files/720HOODIEBACK_7bb26ddd-d221-4380-9914-ca091b1cfd51.png?v=1728518072&width=823",
    link: "https://boywithukemusic.com/products/hoodie",
  },
  {
    title: "B SIDES MINERAL WASH HOODIE",
    desc: "Disponible por tiempo limitado",
    img: "https://boywithukemusic.com/cdn/shop/files/B_Sides_Mineral_Wash_Hoodie_Front.png?v=1757447788&width=713",
    hoverImg:
      "https://boywithukemusic.com/cdn/shop/files/B_Sides_Mineral_wash_Hoodie_back.png?v=1757447788&width=823",
    link: "https://boywithukemusic.com/products/b-sides-mineral-wash-hoodie",
  },
  {
    title: "BURNOUT TEE",
    desc: "Perfecta para cualquier ocasión",
    img: "https://boywithukemusic.com/cdn/shop/files/BurnoutTee-1200.png?v=1728520743&width=360",
    link: "https://boywithukemusic.com/products/burnout-tee-1",
  },
  {
    title: "BURNOUT HAT",
    desc: "Perfecta para cualquier ocasión",
    img: "https://boywithukemusic.com/cdn/shop/files/BurnoutHat-1200.png?v=1747717971&width=360",
    link: "https://boywithukemusic.com/products/burnout-hat",
  },
  {
    title: "BURNOUT HOODIE",
    desc: "Perfecta para cualquier ocasión",
    img: "https://boywithukemusic.com/cdn/shop/files/BoyWithUkeBurnoutHoodieFront1200_a43b9208-9b26-4f7c-9d2a-bb8fd34c56bd.png?v=1747718244&width=823",
    hoverImg:
      "https://boywithukemusic.com/cdn/shop/files/BoyWithUkeBurnoutHoodieBack1200_77e21627-5e3c-45fc-abb8-2e6fa3cea970.png?v=1747718244&width=823",
    link: "https://boywithukemusic.com/products/burnout-hoodie",
  },
  {
    title: "BURNOUT TOUR TEE",
    desc: "Perfecta para cualquier ocasión",
    img: "https://boywithukemusic.com/cdn/shop/files/boywithuke_burnout_tour_tee_front_a233943c-bc34-42c9-bb69-f7977761734c.png?v=1747693965&width=823",
    hoverImg:
      "https://boywithukemusic.com/cdn/shop/files/boywithuke_burnout_tour_tee_back_64c16f65-d36f-4a8e-993f-f32f6fbe7eaf.png?v=1747693965&width=823",
    link: "https://boywithukemusic.com/products/burnout-tour-tee",
  },
  {
    title: "BURNOUT TOTE",
    desc: "Perfecta para cualquier ocasión",
    img: "https://boywithukemusic.com/cdn/shop/files/boywithuke-tote.png?v=1728662323&width=360",
    link: "https://boywithukemusic.com/products/burnout-tote",
  },
  {
    title: "MEOW BEANIE",
    desc: "Perfecta para cualquier ocasión",
    img: "https://boywithukemusic.com/cdn/shop/files/UKE3.png?v=1728517892&width=360",
    link: "https://boywithukemusic.com/products/meow-beanie",
  },
  {
    title: "LUCID DREAMS TOUR 2024 TEE",
    desc: "Perfecta para cualquier ocasión",
    img: "https://boywithukemusic.com/cdn/shop/files/720SHIRTFRONT_a90e0212-e1c7-4213-81ff-b9268cdb73ca.png?v=1728518012&width=823",
    hoverImg:
      "https://boywithukemusic.com/cdn/shop/files/720SHIRTBACK_d2b791f6-f689-4b9a-b55c-0d9ca49658d8.png?v=1728518011&width=823",
    link: "https://boywithukemusic.com/products/tour-t-shirt",
  },
  {
    title: "BURNOUT CD (SIGNED)",
    desc: "Perfecta para cualquier ocasión",
    img: "https://boywithukemusic.com/cdn/shop/files/Burnout-LP-standalone-1-1200.png?v=1728510500&width=823",
    hoverImg:
      "https://boywithukemusic.com/cdn/shop/files/Burnout-LP-standalone-2-1200.png?v=1728510500&width=823",
    link: "https://boywithukemusic.com/products/burnout-cd",
  },
];

export const Merch = () => {
  return (
    <section className="relative min-h-screen px-4 py-24 text-white overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/1200x/31/76/d3/3176d398c1bbe57556bea79626a672c8.jpg)",
        }}
      />

      {/* Overlay oscuro + neón */}
      <div className="absolute inset-0 -z-10 bg-black/70
        [background-image:
          radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.35),transparent_45%),
          radial-gradient(circle_at_80%_70%,rgba(250,204,21,0.35),transparent_45%)
        ]
      " />

      <h2 className="text-center text-3xl font-black tracking-widest mb-16
        text-sky-400
        drop-shadow-[0_0_25px_rgba(56,189,248,1)]
      ">
        MERCH
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 max-w-6xl mx-auto">
        {merchItems.map((item) => (
          <MerchCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
};

/* ================= CARD ================= */

const MerchCard = ({ item }: { item: MerchItem }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="
        relative bg-black/50 rounded-2xl p-4 text-center
        border border-sky-400/30
        transition-all duration-300
        hover:-translate-y-2
        hover:border-yellow-400/60
        hover:shadow-[0_0_30px_rgba(56,189,248,0.45),0_0_50px_rgba(250,204,21,0.25)]
      "
      onMouseEnter={() => item.hoverImg && setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="
        w-full h-48 rounded-xl overflow-hidden mb-4
        border border-sky-400/40
        shadow-[0_0_20px_rgba(56,189,248,0.35)]
        transition
      ">
        <img
          src={hover && item.hoverImg ? item.hoverImg : item.img}
          alt={item.title}
          className="w-full h-full object-cover transition duration-300"
        />
      </div>

      <h4 className="font-bold text-sm mb-1">{item.title}</h4>
      <p className="text-xs text-white/70 mb-4">{item.desc}</p>

      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        className="
          inline-block px-5 py-2 text-xs font-black rounded-xl
          bg-gradient-to-br from-yellow-300 to-yellow-500
          text-black
          shadow-[0_0_15px_rgba(250,204,21,0.8)]
          hover:shadow-[0_0_30px_rgba(250,204,21,1)]
          hover:scale-105
          transition
        "
      >
        Comprar
      </a>
    </div>
  );
};

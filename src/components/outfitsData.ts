// outfitsData.ts

export interface Outfit {
  id?: string;        // opcional para el outfit secreto
  name: string;
  image: string;      // imagen grande (panel derecho)
  thumb: string;      // miniatura (grid)
  description: string;
  era?: string;       // opcional, para futuras mejoras
  secret?: boolean;   // indica si es secreto
}

// Outfit secreto, solo se desbloquea con Konami
export const secretOutfit: Outfit = {
  id: "secret",
  name: "???",
  image: "/imgs/tobi2.png",
  thumb: "/imgs/tobi.png",
  description: "Has desbloqueado algo que no debía ser visto.",
  secret: true,
};

// Lista principal de outfits
export const outfits: Outfit[] = [
  {
    id: "sporty",
    name: "SPORTY UKE",
    image: "/imgs/Sportyuke.png",
    thumb: "/imgs/Sportyuke2.png",
    description:
      "Look deportivo y enérgico. Representa la faceta más dinámica de BoyWithUke.",
    era: "Energetic",
  },
  {
    id: "friendly",
    name: "FRIENDLY UKE",
    image: "/imgs/Frienduke.png",
    thumb: "/imgs/Frienduke2.png",
    description:
      "Un estilo relajado y amable. Ideal para momentos más tranquilos.",
    era: "Calm",
  },
  {
    id: "rockstar",
    name: "ROCKSTAR UKE",
    image: "/imgs/Rockstaruke.png",
    thumb: "/imgs/Rockstaruke3.png",
    description:
      "Actitud rebelde con toques eléctricos. La versión más audaz del artista.",
    era: "Rebel",
  },
  {
    id: "sickof",
    name: "SICK OF UKE",
    image: "/imgs/Sickofuke.png",
    thumb: "/imgs/Sickofuke2.png",
    description:
      "Refleja emociones más oscuras y sinceras, conectadas a temas de desahogo personal.",
    era: "Dark",
  },
  {
    id: "understand",
    name: "UNDERSTAND UKE",
    image: "/imgs/Understanduke.png",
    thumb: "/imgs/Understanduke2.png",
    description:
      "Una faceta reflexiva que transmite comprensión y empatía.",
    era: "Reflective",
  },
  {
    id: "toxic",
    name: "TOXIC UKE",
    image: "/imgs/Toxicuke.png",
    thumb: "/imgs/Toxicuke2.png",
    description:
      "Representa una etapa de autocrítica y emociones turbulentas.",
    era: "Chaotic",
  },
  {
    id: "first",
    name: "FIRST UKE",
    image: "/imgs/Firstuke.png",
    thumb: "/imgs/Firstuke2.png",
    description:
      "El primer diseño clásico, que simboliza los inicios del artista.",
    era: "Origin",
  },
  {
    id: "migraine",
    name: "MIGRAINE UKE",
    image: "/imgs/Migraineuke.png",
    thumb: "/imgs/Migraineuke2.png",
    description:
      "Un diseño introspectivo y melancólico, inspirado en temas personales.",
    era: "Melancholy",
  },
  {
    id: "trendy",
    name: "TRENDY UKE",
    image: "/imgs/Trendyuke.png",
    thumb: "/imgs/Trendyuke2.png",
    description:
      "Moderno y juvenil, enfocado en estilo y presencia escénica.",
    era: "Modern",
  },
  {
    id: "ghost",
    name: "GHOST CHARLEY",
    image: "/imgs/Ghostcharley.png",
    thumb: "/imgs/Ghostcharley2.png",
    description:
      "Charley en su forma más etérea y misteriosa. Referencia directa a “Ghost”.",
    era: "Ethereal",
  },
  {
    id: "gaslight",
    name: "GASLIGHT CHARLEY",
    image: "/imgs/Gaslightcharley.png",
    thumb: "/imgs/Gaslightcharley2.png",
    description:
      "Un look oscuro con un toque psicológico y manipulador.",
    era: "Psychological",
  },
  {
    id: "longdrives",
    name: "LONG DRIVES UKE",
    image: "/imgs/Longdrivesuke.png",
    thumb: "/imgs/Longdrivesuke2.png",
    description:
      "Inspirado en los viajes largos, la calma y la melancolía.",
    era: "Roadtrip",
  },
  {
    id: "problematic",
    name: "PROBLEMATIC UKE",
    image: "/imgs/Problematicuke.png",
    thumb: "/imgs/Problematicuke2.png",
    description:
      "Una representación de las contradicciones internas y conflictos personales.",
    era: "Conflict",
  },
  {
    id: "can-you-feel-it",
    name: "CAN YOU FEEL IT? CHARLEY",
    image: "/imgs/CanYouFeelItCharley.png",
    thumb: "/imgs/CanYouFeelItCharley2.png",
    description:
      "Charley en su versión más expresiva y emocional. Referencia directa a la canción homónima.",
    era: "Emotional",
  },
];

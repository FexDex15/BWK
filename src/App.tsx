// App.tsx
import { useEffect, useState } from "react";
import "./App.css";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

import { Discography } from "./components/Discography";
import { Biography } from "./components/Biography";
import { AboutPage } from "./components/AboutPage";
import { Snippets } from "./components/Snippets";
import { SoundCloud } from "./components/SoundCloud";
import { SongsLore } from "./components/songslore";
import { Merch } from "./components/Merch";
import Outfits from "./components/Outfits";


import { PlayerProvider } from "./components/PlayerContext";
import { TurntablePlayer } from "./components/TurntablePlayer";

/* ================= TIPOS ================= */

export type Page =
  | "home"
  | "music"
  | "biography"
  | "about"
  | "snippets"
  | "soundcloud"
  | "songslore"
  | "merch"
  | "outfits";

/* ================= CONTENIDO ================= */

function AppContent() {
  const [page, setPage] = useState<Page>("home");

  // 🔁 Sincroniza hash al cargar / recargar
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as Page;
    if (hash) setPage(hash);
  }, []);

  const handleNavigate = (next: Page) => {
    setPage(next);
    window.location.hash = next === "home" ? "" : `#${next}`;
  };

  return (
    <>
      <Navbar onNavigate={handleNavigate} />

      {page === "home" && <Hero />}
      {page === "music" && <Discography />}
      {page === "biography" && <Biography />}
      {page === "snippets" && <Snippets />}
      {page === "soundcloud" && <SoundCloud />}
      {page === "songslore" && <SongsLore />}
      {page === "about" && <AboutPage />}
      {page === "merch" && <Merch />}
      {page === "outfits" && <Outfits />}

      <Footer />
      <ScrollToTop />
    </>
  );
}

/* ================= ROOT ================= */

export default function App() {
  return (
    <PlayerProvider>
      <AppContent />
      <TurntablePlayer />
    </PlayerProvider>
  );
}

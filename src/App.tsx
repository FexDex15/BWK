// App.tsx
import { useState } from "react";
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
import { SongsLore } from "./components/songslore"; // ✅ CORREGIDO

import { PlayerProvider } from "./components/PlayerContext";
import { TurntablePlayer } from "./components/TurntablePlayer";

/* ✅ Tipo Page global */
export type Page =
  | "home"
  | "music"
  | "biography"
  | "about"
  | "snippets"
  | "soundcloud"
  | "songslore";

/* ================= CONTENIDO PRINCIPAL ================= */
function AppContent() {
  const [page, setPage] = useState<Page>("home");

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

      <Footer />
      <ScrollToTop />
    </>
  );
}

/* ================= APP ROOT ================= */
export default function App() {
  return (
    <PlayerProvider>
      <AppContent />
      <TurntablePlayer />
    </PlayerProvider>
  );
}

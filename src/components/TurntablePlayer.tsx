import { useState } from "react";
import { usePlayer } from "./PlayerContext";
import { TRACKS } from "../components/tracks";

export const TurntablePlayer = () => {
  const {
    currentTrack,
    currentVersion,
    currentCover,
    playing,
    togglePlay,
    playTrack,
    currentTime,
    duration,
    seek,
  } = usePlayer();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [randomResults, setRandomResults] = useState<typeof TRACKS>([]);

  const filteredTracks = TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.album?.toLowerCase().includes(search.toLowerCase())
  );

  const handleClickSearch = () => {
    if (filteredTracks.length === 0) return;
    const shuffled = [...filteredTracks].sort(() => 0.5 - Math.random());
    setRandomResults(shuffled.slice(0, Math.min(5, shuffled.length)));
    setShowResults(true);
  };

  return (
    <>
      {/* ================= MINI PLAYER ================= */}
      <div
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-br from-[#111827] to-[#020617] border-2 border-sky-400/40 shadow-[0_0_30px_rgba(56,189,248,0.45)] cursor-pointer hover:scale-[1.05] transition"
      >
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-blue-400/60 shadow-[0_0_15px_rgba(45,85,255,0.55)] ${
            playing ? "animate-spinSlow" : ""
          }`}
        >
          {currentTrack ? (
            <img src={currentCover} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue-400">
              🎧
            </div>
          )}
        </div>

        <div className="leading-tight">
          <p className="text-white text-sm sm:text-base font-bold tracking-wide">
            {currentTrack?.title ?? "BOOMBOX"}
          </p>
          <p className="text-xs text-sky-400">TAP TO OPEN</p>
        </div>
      </div>

      {/* ================= MODAL BOOMBOX ================= */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-2 sm:px-0 pt-16 sm:pt-20">
          {/* Fondo oscuro */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* Contenedor principal */}
          <div className="relative z-10 w-full max-w-md sm:max-w-lg rounded-[2rem] p-4 sm:p-6 bg-gradient-to-br from-[#0b1020] via-[#020617] to-black border-4 border-sky-400/30 shadow-[0_0_120px_rgba(45,85,255,0.6)] text-white">
            {/* Botón cerrar */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              ✕
            </button>

            {/* Disco principal */}
            <div className="flex justify-center mb-4">
              <div
                className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-blue-500/70 shadow-[0_0_50px_rgba(3,138,255,0.7)] bg-black ${
                  playing ? "animate-spinSlow" : ""
                }`}
              >
                {currentTrack && (
                  <img src={currentCover} className="w-full h-full object-cover" />
                )}
              </div>
            </div>

            {/* Título y álbum */}
            <h3 className="text-center text-lg sm:text-xl font-extrabold tracking-widest mb-1 text-blue-400">
              {currentTrack?.title ?? "INSERT CASSETTE"}
            </h3>
            {currentTrack && currentTrack.album && (
              <p className="text-center text-sm sm:text-base text-white/70 mb-2">{currentTrack.album}</p>
            )}

            {/* Versiones */}
            {currentTrack && currentTrack.versions.raw && (
              <div className="flex justify-center gap-3 mb-3 flex-wrap">
                <button
                  onClick={() => playTrack(currentTrack, "autotune")}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    currentVersion === "autotune"
                      ? "bg-blue-500 text-black"
                      : "bg-white/5 text-white"
                  }`}
                >
                  Autotune
                </button>
                <button
                  onClick={() => playTrack(currentTrack, "raw")}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    currentVersion === "raw"
                      ? "bg-blue-500 text-black"
                      : "bg-white/5 text-white"
                  }`}
                >
                  Raw
                </button>
              </div>
            )}

            {/* Progreso */}
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-xs sm:text-sm text-sky-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Botón Play */}
            <div className="flex justify-center mt-4 mb-4">
              <button
                onClick={togglePlay}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-yellow-400 text-black text-2xl sm:text-3xl flex items-center justify-center shadow-[0_0_20px_rgba(0,181,204,0.7)] hover:scale-110 transition"
              >
                {playing ? "⏸" : "▶"}
              </button>
            </div>

            {/* ================= BUSCADOR ================= */}
            <div className="relative w-full mt-3">
              <input
                type="search"
                placeholder="Buscar canción o álbum..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowResults(e.target.value.length > 0);
                }}
                className="w-full p-2 rounded-xl bg-black/70 border-2 border-sky-400/30 text-white focus:outline-none mb-1 text-sm sm:text-base"
              />

              {/* Mini popup flotante */}
              {showResults && (
                <div
                  className="
                    custom-scroll
                    absolute top-full left-1/2 mt-1
                    bg-black/90 border border-sky-400/30 rounded-xl shadow-lg
                    max-h-44 overflow-y-auto z-50 px-1
                  "
                  style={{
                    transform: 'translateX(-50%)',
                    width: 'min(100%, 320px)',
                    boxSizing: 'border-box',
                  }}
                >
                  {(filteredTracks.length > 0 ? filteredTracks : []).map((t) => (
                    <button
                      key={t.title}
                      onClick={() => playTrack(t)}
                      className="w-full flex justify-between items-center p-2 mb-1 rounded-lg bg-white/5 hover:bg-white/10 text-sm sm:text-base"
                    >
                      <div className="flex items-center gap-2">
                        {/* Miniatura disco */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-blue-400/60 shadow-sm">
                          <img
                            src={t.cover}
                            className={`w-full h-full object-cover ${
                              currentTrack?.title === t.title && playing ? "animate-spinSlow" : ""
                            }`}
                          />
                        </div>
                        {/* Texto */}
                        <div className="text-left">
                          <p className="font-semibold">{t.title}</p>
                          {t.album && <p className="text-xs sm:text-sm text-white/50">{t.album}</p>}
                        </div>
                      </div>
                    </button>
                  ))}
                  {filteredTracks.length === 0 && (
                    <p className="text-center text-white/50 mt-2 text-sm sm:text-base">
                      No se encontró ninguna canción
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function formatTime(sec = 0) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

import { TRACKS } from "./tracks";
import { usePlayer } from "../components/PlayerContext";

export const MusicLibrary = () => {
  const { playTrack, currentTrack } = usePlayer();

  return (
    <section className="py-24 px-6 text-white">
      <h2 className="text-3xl font-bold text-center mb-2">
        Todas las canciones
      </h2>
      <p className="text-center text-white/50 mb-10">
        elige qué escuchar
      </p>

      <div className="max-w-3xl mx-auto space-y-3">
        {TRACKS.map((track) => {
          const isActive = currentTrack?.title === track.title;

          return (
            <button
              key={track.title}
              onClick={() => playTrack(track)}
              className={`
                w-full flex items-center gap-4 p-3 rounded-lg
                transition border
                ${isActive
                  ? "bg-sky-500/20 border-sky-400"
                  : "bg-white/5 border-white/10 hover:bg-white/10"}
              `}
            >
              <img
                src={track.cover}
                alt={track.title}
                className="w-12 h-12 rounded-md object-cover"
              />

              <span className="text-left font-medium">
                {track.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

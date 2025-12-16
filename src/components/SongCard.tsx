import { Track } from "./PlayerContext";
import { usePlayer } from "./PlayerContext";

export const SongCard = ({ track }: { track: Track }) => {
  const { playTrack } = usePlayer();

  return (
    <button
      onClick={() => playTrack(track)}
      className="
        w-full flex items-center gap-4
        p-4 rounded-xl
        bg-white/5 hover:bg-white/10
        text-white
      "
    >
      <img
        src={track.cover}
        className="w-14 h-14 rounded-md object-cover"
      />

      <div className="text-left">
        <p className="font-semibold">{track.title}</p>
        <p className="text-xs text-white/50">Reproducir</p>
      </div>
    </button>
  );
};



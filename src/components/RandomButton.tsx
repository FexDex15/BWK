import React from "react";
import { TRACKS } from "./tracks";
import { usePlayer } from "./PlayerContext";

export const RandomButton: React.FC = () => {
  const { playTrack, currentTrack } = usePlayer();

  const playRandom = () => {
    if (TRACKS.length === 0) return;

    let next = currentTrack;

    // Evitar repetir la misma canción
    while (TRACKS.length > 1 && next?.title === currentTrack?.title) {
      next = TRACKS[Math.floor(Math.random() * TRACKS.length)];
    }

    playTrack(next ?? TRACKS[0]);
  };

  return (
    <button
      onClick={playRandom}
      title="Random song"
      className="
        flex items-center justify-center gap-2
        px-4 py-2 rounded-xl
        bg-gradient-to-br from-fuchsia-500 to-violet-600
        text-black font-extrabold tracking-widest text-sm
        shadow-[0_0_25px_rgba(168,85,247,0.9)]
        hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,1)]
        transition
      "
    >
      🔀 RANDOM
    </button>
  );
};
   
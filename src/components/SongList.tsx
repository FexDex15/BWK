import { TRACKS } from "../components/tracks";
import { SongCard } from "./SongCard";

export const SongList = () => {
  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col gap-4">
      {TRACKS.map((track, i) => (
        <SongCard key={i} track={track} />
      ))}
    </div>
  );
};

import { createContext, useContext, useRef, useState, useEffect } from "react";

/* ================= TYPES ================= */
export interface Track {
  title: string;
  album?: string;
  cover: string;
  covers?: {
    autotune?: string;
    raw?: string;
  };
  versions: {
    autotune: string;
    raw?: string;
  };
}

interface PlayerContextType {
  currentTrack: Track | null;
  currentVersion: "autotune" | "raw";
  currentCover: string;
  playing: boolean;
  playTrack: (track: Track, version?: "autotune" | "raw") => void;
  togglePlay: () => void;

  isOpen: boolean;
  openPlayer: () => void;
  closePlayer: () => void;

  currentTime: number;
  duration: number;
  seek: (time: number) => void;

  volume: number;
  setVolume: (v: number) => void;
}

/* ================= CONTEXT ================= */
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

/* ================= PROVIDER ================= */
export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const clickRef = useRef<HTMLAudioElement>(new Audio("/sfx/click.mp3"));

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentVersion, setCurrentVersion] = useState<"autotune" | "raw">("autotune");
  const [currentCover, setCurrentCover] = useState("");
  const [playing, setPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);

  /* ================= UTILS ================= */
  const playClick = () => {
    const click = clickRef.current;
    if (!click) return;
    click.currentTime = 0;
    click.volume = 0.4;
    click.play().catch(() => {});
  };

  /* ================= CORE ================= */
  const playTrack = (track: Track, version: "autotune" | "raw" = "autotune") => {
  playClick();
  const audio = audioRef.current;
  if (!audio) return;

  const audioSrc = track.versions[version]; // <-- extraemos
  if (!audioSrc) {
    console.warn(`La versión ${version} no existe para esta canción`);
    return;
  }

  audio.pause();
  audio.src = audioSrc; // <-- seguro, ya que verificamos
  audio.currentTime = 0;
  audio.volume = volume;
  audio.load();

  audio
    .play()
    .then(() => {
      setCurrentTrack(track);
      setCurrentVersion(version);
      setCurrentCover(track.covers?.[version] ?? track.cover);
      setPlaying(true);
      setIsOpen(true);
    })
    .catch((err) => {
      console.error("Audio bloqueado:", err);
      setPlaying(false);
    });
};


  const togglePlay = () => {
    playClick();
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (audio.paused) {
      audio.play().then(() => setPlaying(true));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const setVolume = (v: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = v;
    setVolumeState(v);
  };

  /* ================= EVENTS ================= */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const onEnd = () => {
      setPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  /* ================= PROVIDER ================= */
  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        currentVersion,
        currentCover,
        playing,
        playTrack,
        togglePlay,
        isOpen,
        openPlayer: () => setIsOpen(true),
        closePlayer: () => setIsOpen(false),
        currentTime,
        duration,
        seek,
        volume,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

/* ================= HOOK ================= */
export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer debe usarse dentro de PlayerProvider");
  return ctx;
};

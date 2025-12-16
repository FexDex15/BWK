import React from "react";

interface SoundCloudTrack {
  title: string;
  url: string;
  color?: string;
}

const tracks: SoundCloudTrack[] = [
  { title: "Hot Dog 🌭", url: "https://soundcloud.com/boywithuke/hot-dog", color: "2ee2a8" },
  { title: "Your Time's Up", url: "https://soundcloud.com/boywithuke/your-times-up", color: "333333" },
  { title: "Help My Dentist Is Evil", url: "https://soundcloud.com/boywithuke/help-my-dentist-is-evil" },
  { title: "Never Ever 3", url: "https://soundcloud.com/boywithuke/never-ever-3" },
  { title: "Cauliflower Broccoli", url: "https://soundcloud.com/boywithuke/cauliflower-broccoli" },
  { title: "Melancholic", url: "https://soundcloud.com/boywithuke/melancholic" },
  { title: "Orange Juice", url: "https://soundcloud.com/boywithuke/orange-juice" },
  { title: "Dead a Little Sooner", url: "https://soundcloud.com/boywithuke/dead-a-little-sooner" },
  { title: "Poopy Snow", url: "https://soundcloud.com/boywithuke/poopy-snow" },
  { title: "Strange", url: "https://soundcloud.com/boywithuke/strange" },
  { title: "For Nobody I Know", url: "https://soundcloud.com/boywithuke/for-nobody-i-know" },
  { title: "Lowkey Into You", url: "https://soundcloud.com/boywithuke/lowkey-into-you" },
  { title: "Late Nite Snacks", url: "https://soundcloud.com/boywithuke/late-nite-snacks" },
  { title: "wow je suis tellement créatif", url: "https://soundcloud.com/boywithuke/wow-je-suis-tellement-cre-atif" },
  { title: "Frank Ocean - Ivy (Uke Cover)", url: "https://soundcloud.com/boywithuke/frank-ocean-ivy-ukulele-cover" },
  { title: "Sleep Paralysis", url: "https://soundcloud.com/boywithuke/sleep-paralysis" },
  { title: "i dunno (uke)", url: "https://soundcloud.com/boywithuke/i-dunno" },
  { title: "have you ever wondered like i do", url: "https://soundcloud.com/boywithuke/have-you-ever-thought-like-i" },
  { title: "fifteen hours (uke)", url: "https://soundcloud.com/boywithuke/fifteen-hours" },
  { title: "where do we go (uke)", url: "https://soundcloud.com/boywithuke/where-do-we-go" },
  { title: "sunday", url: "https://soundcloud.com/boywithuke/sunday" },
  { title: "Poser Boy", url: "https://soundcloud.com/boywithuke/poser-boy" },
  { title: "Alien", url: "https://soundcloud.com/boywithuke/alien" },
  { title: "No Fear", url: "https://soundcloud.com/boywithuke/no-fear" },
  { title: "Riptide (Cover)", url: "https://soundcloud.com/boywithuke/riptide-boywithuke-cover" },
  { title: "Head Song", url: "https://soundcloud.com/boywithuke/head-song" },
  { title: "Out Of Reach", url: "https://soundcloud.com/boywithuke/out-of-reach" },
];

export const SoundCloud: React.FC = () => {
  return (
    <section
      id="soundcloud"
      className="
        min-h-screen
        mt-20
        mx-auto
        max-w-[1400px]
        px-6
        py-12
        rounded-2xl
        bg-gradient-to-br from-black/90 to-indigo-900/80
        shadow-xl
      "
    >
      {/* HEADER */}
      <header className="text-center mb-14">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          🎧 BoyWithUke en SoundCloud
        </h1>
        <p className="mt-4 text-white/70 max-w-2xl mx-auto">
          Remixes, demos, covers y canciones exclusivas publicadas en SoundCloud.
        </p>
      </header>

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
        "
      >
        {tracks.map((track, idx) => (
          <div
            key={idx}
            className="
              rounded-2xl
              bg-black/50
              backdrop-blur-md
              p-4
              shadow-lg
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
            "
          >
            <h3 className="mb-3 text-sm font-semibold text-white text-center">
              {track.title}
            </h3>

            <iframe
              loading="lazy"
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              className="rounded-xl"
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                track.url
              )}&color=%23${track.color ?? "2ee2a8"}&auto_play=false&show_comments=true&show_user=true`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

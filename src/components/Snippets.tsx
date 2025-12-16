import React from "react";

interface Snippet {
  title: string;
  trackUrl: string;
  authorName: string;
  authorUrl: string;
  trackLink: string;
  color: string;
}

const snippets: Snippet[] = [
  {
    title: "BoyWithUke - Nothing at All",
    trackUrl: "https://api.soundcloud.com/tracks/1730728236",
    authorName: "Temi <3",
    authorUrl: "https://soundcloud.com/iamtemi",
    trackLink: "https://soundcloud.com/iamtemi/boywithuke-nothing-at-all",
    color: "ff5500",
  },
  {
    title: "BoyWithUke - Dear Hollywood",
    trackUrl: "https://api.soundcloud.com/tracks/1729851012",
    authorName: "Temi <3",
    authorUrl: "https://soundcloud.com/iamtemi",
    trackLink:
      "https://soundcloud.com/iamtemi/boywithuke-dear-hollywood-scrapped-song-lyric-snippet-360p",
    color: "ff5500",
  },
  {
    title: "BoyWithUke - Terrified",
    trackUrl: "https://api.soundcloud.com/tracks/1729736382",
    authorName: "Temi <3",
    authorUrl: "https://soundcloud.com/iamtemi",
    trackLink: "https://soundcloud.com/iamtemi/boywithuke-terrified",
    color: "617977",
  },
  {
    title: "BoyWithUke - Monster",
    trackUrl: "https://api.soundcloud.com/tracks/1730727981",
    authorName: "Temi <3",
    authorUrl: "https://soundcloud.com/iamtemi",
    trackLink: "https://soundcloud.com/iamtemi/boywithuke-monster",
    color: "617977",
  },
  {
    title: "BoyWithUke - Time",
    trackUrl: "https://api.soundcloud.com/tracks/1729851447",
    authorName: "Temi <3",
    authorUrl: "https://soundcloud.com/iamtemi",
    trackLink:
      "https://soundcloud.com/iamtemi/boywithuke-time-full-combined-extended-360p",
    color: "617977",
  },
  {
    title: "BoyWithUke - Watch You Burn",
    trackUrl: "https://api.soundcloud.com/tracks/1729851234",
    authorName: "Temi <3",
    authorUrl: "https://soundcloud.com/iamtemi",
    trackLink:
      "https://soundcloud.com/iamtemi/boywithuke-burn-miami-unreleased-studio-song-boywithukeofficial-360p",
    color: "617977",
  },
  {
    title: "BoyWithUke - Cataclysmic",
    trackUrl: "https://api.soundcloud.com/tracks/1729850673",
    authorName: "Temi <3",
    authorUrl: "https://soundcloud.com/iamtemi",
    trackLink: "https://soundcloud.com/iamtemi/boywithuke-cataclysmic-nihilistic",
    color: "617977",
  },
  {
    title: "BoyWithUke - Blind",
    trackUrl: "https://api.soundcloud.com/tracks/1729850499",
    authorName: "Temi <3",
    authorUrl: "https://soundcloud.com/iamtemi",
    trackLink: "https://soundcloud.com/iamtemi/boywithuke-blind",
    color: "617977",
  },
  {
    title: "BoyWithUke - La La Land",
    trackUrl: "https://api.soundcloud.com/tracks/1729850388",
    authorName: "Temi <3",
    authorUrl: "https://soundcloud.com/iamtemi",
    trackLink: "https://soundcloud.com/iamtemi/boywithuke-la-la-land-1",
    color: "617977",
  },
  {
    title: "BoyWithUke - Next Best Thing / Out of Reach",
    trackUrl: "https://api.soundcloud.com/tracks/1729270428",
    authorName: "Temi <3",
    authorUrl: "https://soundcloud.com/iamtemi",
    trackLink:
      "https://soundcloud.com/iamtemi/boywithuke-next-best-thing-out-of-reach",
    color: "dabec8",
  },
  {
    title: "BoyWithUke - Apricity",
    trackUrl: "https://api.soundcloud.com/tracks/1729269156",
    authorName: "Temi <3",
    authorUrl: "https://soundcloud.com/iamtemi",
    trackLink: "https://soundcloud.com/iamtemi/boywithuke-apricity-1",
    color: "bcb2be",
  },
  {
    title: "BoyWithUke - Highs, Goodbyes and Lows",
    trackUrl: "https://api.soundcloud.com/tracks/1733569092",
    authorName: "Temi <3",
    authorUrl: "https://soundcloud.com/iamtemi",
    trackLink:
      "https://soundcloud.com/iamtemi/boywithuke-highs-goodbyes-and-lows",
    color: "949c9c",
  },
  {
    title: "BoyWithUke - Ghost (Live Concert)",
    trackUrl: "https://api.soundcloud.com/tracks/1744199880",
    authorName: "Temi <3",
    authorUrl: "https://soundcloud.com/iamtemi",
    trackLink: "https://soundcloud.com/iamtemi/boywithuke-ghost-live-concert",
    color: "5c5856",
  },
  {
    title: "BoyWithUke - Corduroy",
    trackUrl: "https://api.soundcloud.com/tracks/1786988929",
    authorName: "Boywithagreenuke",
    authorUrl: "https://soundcloud.com/user-719707051",
    trackLink: "https://soundcloud.com/user-719707051/coudoryboywithuke",
    color: "bac3c6",
  },
  {
    title: "BoyWithUke - Liamhasamask-go",
    trackUrl: "https://api.soundcloud.com/tracks/1882858440",
    authorName: "Boywithagreenuke",
    authorUrl: "https://soundcloud.com/user-719707051",
    trackLink:
      "https://soundcloud.com/user-719707051/liamhasamask-go-leak",
    color: "043434",
  },
];

export const Snippets: React.FC = () => {
  return (
    <section
      id="snippets"
      className="
        min-h-screen
        p-10
        mt-20
        mx-auto
        max-w-[1400px]
        rounded-2xl
        bg-gradient-to-br from-black/90 to-blue-900/80
        text-center
        shadow-xl
      "
    >
      <h2 className="mb-10 text-4xl font-bold text-white drop-shadow-lg">
        🎧 Snippets de BoyWithUke
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {snippets.map((snip, idx) => (
          <div
            key={idx}
            className="
              w-full
              max-w-xs
              rounded-2xl
              bg-black/50
              p-4
              backdrop-blur-md
              shadow-lg
              transition-transform
              duration-300
              hover:scale-105
              hover:shadow-2xl
            "
          >
            <h3 className="mb-3 text-lg font-semibold text-white drop-shadow">
              {snip.title}
            </h3>

            <iframe
              sandbox="allow-scripts allow-same-origin allow-popups"
              loading="lazy"
              width="100%"
              height={180}
              scrolling="no"
              frameBorder="no"
              allow="autoplay; encrypted-media"
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                snip.trackUrl
              )}&color=%23${snip.color}&auto_play=false&visual=true`}
              className="rounded-xl"
            />

            <div className="mt-2 truncate text-xs text-white/70">
              <a
                href={snip.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-blue-400"
              >
                {snip.authorName}
              </a>{" "}
              ·{" "}
              <a
                href={snip.trackLink}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-blue-400"
              >
                {snip.title}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

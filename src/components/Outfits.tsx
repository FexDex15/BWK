import { useState, useEffect, useRef } from "react";
import { outfits as baseOutfits } from "./outfitsData";
import "../outfits.css";

const secretOutfit = {
  id: "secret",
  name: "???",
  image: "/imgs/tobi2.png", // Imagen grande del jumpscare
  thumb: "/imgs/tobi.png",
  description: "Has desbloqueado algo que no debía ser visto.",
  secret: true,
};

export default function Outfits() {
  const [current, setCurrent] = useState(0);
  const [glitchOn, setGlitchOn] = useState(false);
  const [shakeOn, setShakeOn] = useState(false);
  const [blueFlashOn, setBlueFlashOn] = useState(false);
  const [negativeFlashOn, setNegativeFlashOn] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [descAnim, setDescAnim] = useState(false);
  const [secretUnlocked, setSecretUnlocked] = useState(
    () => localStorage.getItem("secretOutfit") === "true"
  );
  const [showJumpscare, setShowJumpscare] = useState(false);

  const outfitList = secretUnlocked ? [...baseOutfits, secretOutfit] : baseOutfits;
  const outfit = outfitList[current];

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const miniContainerRef = useRef<HTMLDivElement>(null);

  /* ======== Konami ======== */
  const KONAMI = ["up","up","down","down","left","right","left","right","b","a"];
  const [konamiIndex, setKonamiIndex] = useState(0);

  const unlockSecret = () => {
    if (secretUnlocked) return;
    setSecretUnlocked(true);
    localStorage.setItem("secretOutfit", "true");

    // Activar jumpscare
    setShowJumpscare(true);
    setGlitchOn(true);
    setBlueFlashOn(true);
    setNegativeFlashOn(true);

    setTimeout(() => setGlitchOn(false), 800);
    setTimeout(() => setBlueFlashOn(false), 600);
    setTimeout(() => setNegativeFlashOn(false), 500);
    setTimeout(() => setShowJumpscare(false), 1500);
  };

  const registerKonamiInput = (input: string) => {
    setKonamiIndex((prev) => {
      const next = KONAMI[prev] === input ? prev + 1 : 0;
      if (next === KONAMI.length) {
        unlockSecret();
        return 0;
      }
      return next;
    });
  };

  /* ======== Cambio de outfit ======== */
  const changeOutfit = (index: number) => {
    setCurrent(index);
    setGlitchOn(true);
    setBlueFlashOn(true);
    setTimeout(() => setGlitchOn(false), 450);
    setTimeout(() => setBlueFlashOn(false), 300);
  };

  /* ======== TEMBLEQUEO ALEATORIO ======== */
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.65) {
        setShakeOn(true);
        setTimeout(() => setShakeOn(false), 120);
      }
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  /* ======== MICRO GLITCH ALEATORIO ======== */
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitchOn(true);
        setTimeout(() => setGlitchOn(false), 300);
      }
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  /* ======== TECLADO ======== */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const keyMap: Record<string, string> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        b: "b",
        a: "a",
      };

      const input = keyMap[e.key];
      if (input) registerKonamiInput(input);

      if (e.key === "ArrowRight") changeOutfit((current + 1) % outfitList.length);
      if (e.key === "ArrowLeft") changeOutfit((current - 1 + outfitList.length) % outfitList.length);
      if (e.key === "Escape") setShowDesc(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, secretUnlocked]);

  /* ======== SWIPE IMAGEN PRINCIPAL ======== */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current;
      if (deltaX > 50) {
        changeOutfit((current + 1) % outfitList.length);
        registerKonamiInput("right");
      } else if (deltaX < -50) {
        changeOutfit((current - 1 + outfitList.length) % outfitList.length);
        registerKonamiInput("left");
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  /* ======== SCROLL MINI OUTFITS MOBILE ======== */
  useEffect(() => {
    if (miniContainerRef.current) {
      const container = miniContainerRef.current;
      const selected = container.children[current] as HTMLElement;
      if (selected) {
        const offsetLeft = selected.offsetLeft;
        const containerWidth = container.clientWidth;
        const childWidth = selected.clientWidth;
        container.scrollTo({
          left: offsetLeft - containerWidth / 2 + childWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [current]);

  /* ======== DOBLE TAP B+A en móvil ======== */
  let tapTimeout: any = null;
  const handleDoubleTap = () => {
    if (tapTimeout) {
      clearTimeout(tapTimeout);
      tapTimeout = null;
      registerKonamiInput("b");
      registerKonamiInput("a");
    } else {
      tapTimeout = setTimeout(() => { tapTimeout = null; }, 300);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden font-retro text-cyan-300 crt">
      {/* FONDO */}
      <div className="absolute inset-0 -z-30 bg-room">
        <div className="absolute inset-0 bg-overlay" />
      </div>

      {/* CONTENIDO */}
      <div className="relative flex flex-col lg:flex-row h-full">

        {/* PANEL IZQUIERDO (desktop) */}
        <div className="hidden sm:flex lg:ml-[70px] mt-[90px] flex justify-center lg:justify-start">
          <div className="grid grid-cols-[42px_auto] p-[10px] rounded-xl bg-cyan-400/5 border border-cyan-400/30 shadow-[0_0_40px_rgba(0,255,255,0.15)] max-w-[95vw]">
            <div className="flex items-center justify-center">
              <span className="rotate-[-90deg] text-xl md:text-2xl tracking-[0.4em] glow select-none">
                OUTFIT
              </span>
            </div>
            <div className="grid grid-cols-3 gap-[6px] md:gap-[8px]">
              {outfitList.map((o, i) => (
                <div
                  key={o.name}
                  onClick={() => changeOutfit(i)}
                  className={`w-[88px] h-[130px] sm:w-[96px] sm:h-[140px] md:w-[104px] md:h-[150px] rounded-lg bg-cover bg-center cursor-pointer transition-all duration-300 ${
                    i === current
                      ? "scale-110 ring-2 ring-cyan-300 shadow-[0_0_35px_#00ffff] z-10"
                      : "ring-1 ring-cyan-400/50 shadow-[0_0_14px_#00bfff] hover:scale-105"
                  }`}
                  style={{ backgroundImage: `url(${o.thumb})` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* PANEL PRINCIPAL */}
        <div
          className="flex-1 flex flex-col items-center justify-start sm:justify-center relative px-4 mt-12 lg:mt-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* IMAGEN PRINCIPAL */}
          <img
            src={outfit.image}
            onClick={handleDoubleTap}
            className={`main-image h-[260px] sm:h-[340px] md:h-[420px] lg:h-[460px] object-contain outfit-enter ${
              glitchOn ? "glitch-strong distort signal-break rgb-split" : ""
            } ${blueFlashOn ? "blue-flash" : ""} ${shakeOn ? "shake" : ""} ${
              negativeFlashOn ? "negative-flash" : ""
            } crt-pulse`}
          />
        </div>
      </div>

      {/* JUMPSCARE OUTFIT SECRETO CON IMAGEN */}
      {showJumpscare && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
          <img
            src={secretOutfit.image}
            className="w-[80vw] sm:w-[50vw] glitch-jumpscare negative-flash crt-pulse animate-jumpscare"
            alt="Jumpscare Outfit Secreto"
          />
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { outfits as baseOutfits } from "./outfitsData";
import "../outfits.css";

export default function Outfits() {
  const secretOutfit = {
    id: "secret",
    name: "???",
    image: "/imgs/tobi2.png",
    thumb: "/imgs/tobi.png",
    description: "Has desbloqueado algo que no debía ser visto.",
    secret: true,
  };

  const [current, setCurrent] = useState(0);
  const [glitchOn, setGlitchOn] = useState(false);
  const [shakeOn, setShakeOn] = useState(false);
  const [blueFlashOn, setBlueFlashOn] = useState(false);
  const [invertOn, setInvertOn] = useState(false);
  const invertTimeout = useRef<NodeJS.Timeout | null>(null);

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

  /* ======== Konami Code ======== */
  const KONAMI = ["up","up","down","down","left","right","left","right","b","a"];
  const [konamiIndex, setKonamiIndex] = useState(0);
  console.log(konamiIndex)

  const unlockSecret = () => {
    if (secretUnlocked) return;
    setSecretUnlocked(true);
    localStorage.setItem("secretOutfit", "true");
    setGlitchOn(true);
    setShowJumpscare(true);
    setTimeout(() => setShowJumpscare(false), 1800);
    setTimeout(() => setGlitchOn(false), 600);
  };

  const registerKonamiInput = (input: string) => {
    setKonamiIndex(prev => {
      const next = KONAMI[prev] === input ? prev + 1 : 0;
      if (next === KONAMI.length) {
        unlockSecret();
        return 0;
      }
      return next;
    });
  };

  const changeOutfit = (index: number) => {
    setCurrent(index);
    setGlitchOn(true);
    setBlueFlashOn(true);

    // Parpadeo negativo temporal
    if (invertTimeout.current) clearTimeout(invertTimeout.current);
    setInvertOn(true);
    invertTimeout.current = setTimeout(() => {
      setInvertOn(false);
      invertTimeout.current = null;
    }, 150);

    setTimeout(() => setGlitchOn(false), 450);
    setTimeout(() => setBlueFlashOn(false), 300);
  };

  /* ======== Efectos Aleatorios ======== */
  useEffect(() => {
    const intervalShake = setInterval(() => {
      if (Math.random() > 0.65) {
        setShakeOn(true);
        setTimeout(() => setShakeOn(false), 120);
      }
    }, 2200);

    const intervalGlitch = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitchOn(true);
        setTimeout(() => setGlitchOn(false), 300);
      }
    }, 2600);

    return () => {
      clearInterval(intervalShake);
      clearInterval(intervalGlitch);
    };
  }, []);

  /* ======== Teclado ======== */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const keyMap: Record<string,string> = {
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

  /* ======== Touch Swipe ======== */
  const handleTouchStart = (e: React.TouchEvent) => touchStartX.current = e.changedTouches[0].screenX;
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current;
      if (deltaX > 50) { changeOutfit((current + 1) % outfitList.length); registerKonamiInput("right"); }
      else if (deltaX < -50) { changeOutfit((current - 1 + outfitList.length) % outfitList.length); registerKonamiInput("left"); }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  /* ======== Scroll Mini Outfits ======== */
  useEffect(() => {
    if (!miniContainerRef.current) return;
    const container = miniContainerRef.current;
    const selected = container.children[current] as HTMLElement;
    if (selected) {
      const offsetLeft = selected.offsetLeft;
      const containerWidth = container.clientWidth;
      const childWidth = selected.clientWidth;
      container.scrollTo({ left: offsetLeft - containerWidth / 2 + childWidth / 2, behavior: "smooth" });
    }
  }, [current]);

  /* ======== Double Tap Konami ======== */
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

  const getRandomOffset = () => Math.random() * 40 - 20;
  const getRandomRotation = () => Math.random() * 30 - 15;

  return (
    <div className="relative w-full min-h-screen overflow-hidden font-retro text-cyan-300 crt">
      {/* FONDO */}
      <div className="absolute inset-0 -z-30 bg-room">
        <div className="absolute inset-0 bg-overlay" />
      </div>

      {/* CONTENIDO */}
      <div className="relative flex flex-col lg:flex-row h-full">
        {/* PANEL IZQUIERDO */}
        <div className="hidden sm:flex lg:ml-[70px] mt-[90px] flex justify-center lg:justify-start">
          <div className="grid grid-cols-[42px_auto] p-[10px] rounded-xl bg-cyan-400/5 border border-cyan-400/30 shadow-[0_0_40px_rgba(0,255,255,0.15)] max-w-[95vw]">
            <div className="flex items-center justify-center">
              <span className="rotate-[-90deg] text-xl md:text-2xl tracking-[0.4em] glow select-none">
                OUTFIT
              </span>
            </div>
            <div className="grid grid-cols-3 gap-[6px] md:gap-[8px]" ref={miniContainerRef}>
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
          onClick={handleDoubleTap}
        >
          {/* NOMBRE OUTFIT */}
          <div className="text-2xl sm:text-3xl text-white font-bold glow mb-4 select-none">
            {outfit.name}
          </div>

          {/* IMAGEN PRINCIPAL */}
          <img
            src={outfit.image}
            className={`main-image h-[260px] sm:h-[340px] md:h-[420px] lg:h-[460px] object-contain outfit-enter ${
              glitchOn ? "glitch-strong distort" : ""
            } ${blueFlashOn ? "blue-flash" : ""} ${shakeOn ? "shake" : ""} ${
              invertOn ? "invert-effect" : ""
            }`}
          />

          {/* BOTÓN DESCRIPCIÓN */}
          <button
            onClick={() => {
              setDescAnim(true);
              setShowDesc(true);
              setTimeout(() => setDescAnim(false), 350);
            }}
            className={`mt-4 px-4 py-2 rounded-lg bg-cyan-500/50 border border-cyan-300 text-white font-bold glow hover:scale-105 transition-all ${
              descAnim ? "desc-press desc-glitch" : ""
            }`}
          >
            Descripción
          </button>

          {/* FLECHAS NAVEGACIÓN */}
          <div className="absolute top-1/2 w-full flex justify-between px-4 pointer-events-none">
            <button
              onClick={() => changeOutfit((current - 1 + outfitList.length) % outfitList.length)}
              className="nav-arrow left pointer-events-auto text-4xl sm:text-5xl"
            >
              &#8592;
            </button>
            <button
              onClick={() => changeOutfit((current + 1) % outfitList.length)}
              className="nav-arrow right pointer-events-auto text-4xl sm:text-5xl"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DESCRIPCIÓN */}
      {showDesc && (
        <div className="modal-bg" onClick={() => setShowDesc(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-2">{outfit.name}</h2>
            <p>{outfit.description}</p>
            <button
              onClick={() => setShowDesc(false)}
              className="mt-4 px-4 py-2 rounded-lg border border-cyan-400/50 hover:scale-110 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* JUMPSCARE */}
      {showJumpscare && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random(),
                animation: `flash ${Math.random() * 0.3 + 0.1}s infinite alternate`,
              }}
            />
          ))}
          {[...Array(3)].map((_, i) => (
            <img
              key={i}
              src="/imgs/Tobijumpscare.png"
              className="absolute h-[80vh] w-auto object-contain glitch-strong invert-effect"
              style={{
                top: `${50 + getRandomOffset()}%`,
                left: `${50 + getRandomOffset()}%`,
                transform: `translate(-50%, -50%) rotate(${getRandomRotation()}deg) scale(${1 + Math.random() * 0.4})`,
                opacity: 0.5 + Math.random() * 0.5,
              }}
            />
          ))}
          <div className="absolute bottom-20 text-white text-3xl sm:text-5xl font-bold glow animate-pulse animate-shake">
            ¡OUTFIT SECRETO DESBLOQUEADO!
          </div>
        </div>
      )}
    </div>
  );
}

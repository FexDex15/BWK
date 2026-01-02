import React, { useRef, useState, useCallback } from "react";
import { useBoardStore } from "./boardStore";
import { uid } from "./board.utils";
import BoardCanvas from "./BoardCanvas";
import { FiEdit3, FiTrash2, FiImage, FiSmile, FiType, FiGrid } from "react-icons/fi";
import type { BoardItem } from "./types";

const STICKERS = [
  "/imgs/Firstuke2.png",
  "/imgs/CanYouFeelItCharley2.png",
  "😀", "🎸", "🔥", "🌈", "✨"
];

// Tipos para props de componentes auxiliares
type Tool = "draw" | "erase" | "text" | "sticker" | "pixel" | "image";


// Declaración de TOOLBAR (debe estar antes del componente)
const TOOLBAR = [
  { key: "draw", icon: <FiEdit3 size={28} className="text-blue-400" />, label: "Dibujar" },
  { key: "erase", icon: <FiTrash2 size={28} className="text-blue-300" />, label: "Borrar" },
  { key: "text", icon: <FiType size={28} className="text-blue-400" />, label: "Texto" },
  { key: "sticker", icon: <FiSmile size={28} className="text-pink-300" />, label: "Sticker" },
  { key: "pixel", icon: <FiGrid size={28} className="text-blue-400" />, label: "Pixel" },
  { key: "image", icon: <FiImage size={28} className="text-yellow-400" />, label: "Imagen" },
];

const CommunityBoard: React.FC = () => {
  const [tool, setTool] = useState<Tool>("draw");
  const [color, setColor] = useState<string>("#38bdf8");
  const [lineWidth, setLineWidth] = useState<number>(4);
  const [pixelSize, setPixelSize] = useState<number>(8);
  // Estado para previsualización flotante
  const [previewPos, setPreviewPos] = useState<{x: number, y: number} | null>(null);
  const [textInput, setTextInput] = useState("");
  const [placingText, setPlacingText] = useState(false);
  const [placingSticker, setPlacingSticker] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [placingImage, setPlacingImage] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const items = useBoardStore((state: any) => state.items);
  const addItem = useBoardStore((state: any) => state.addItem);
  const clearBoard = useBoardStore((state: any) => state.clearBoard);

  // Cuando termina de dibujar una línea
  const handleDrawEnd = useCallback((points: number[]) => {
    if (!['draw', 'pixel', 'erase'].includes(tool) || points.length <= 1) return;
    const base = {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      authorId: "anon",
      layer: "main",
      createdAt: new Date(),
    };
    if (tool === "draw") {
      addItem({
        id: uid(),
        type: "draw",
        data: {
          points,
          color,
          strokeWidth: lineWidth,
          brushType: "normal"
        },
        color,
        ...base
      });
    } else if (tool === "pixel") {
      addItem({
        id: uid(),
        type: "draw",
        data: {
          points,
          color,
          pixelSize,
          brushType: "pixel"
        },
        color,
        ...base
      });
    } else if (tool === "erase") {
      addItem({
        id: uid(),
        type: "draw",
        data: {
          points,
          color: "#0f172a",
          strokeWidth: lineWidth + 8,
          brushType: "normal"
        },
        color: "#0f172a",
        ...base
      });
    }
  }, [tool, color, lineWidth, pixelSize, addItem]);

  // Limpiar el pizarrón
  const handleClear = () => {
    if (window.confirm("¿Seguro que quieres limpiar el pizarrón?")) {
      clearBoard();
    }
  };

  // --- Herramientas avanzadas ---
  // Click en el canvas para colocar texto, sticker o imagen
  const handleCanvasClick = useCallback((pos: {x: number, y: number}) => {
    const base = {
      x: pos.x,
      y: pos.y,
      scale: 1,
      rotation: 0,
      authorId: "anon",
      layer: "main",
      createdAt: new Date(),
    };
    if (tool === "text" && textInput.trim() && placingText) {
      addItem({
        id: uid(),
        type: "text",
        data: { text: textInput },
        color,
        ...base
      });
      setTextInput("");
      setPlacingText(false);
    } else if (tool === "sticker" && selectedSticker && placingSticker) {
      addItem({
        id: uid(),
        type: "sticker",
        data: { src: selectedSticker },
        color,
        ...base
      });
      setSelectedSticker(null);
      setPlacingSticker(false);
    } else if (tool === "image" && imageData && placingImage) {
      addItem({
        id: uid(),
        type: "image",
        data: { src: imageData },
        color,
        ...base
      });
      setImageData(null);
      setPlacingImage(false);
    }
  }, [tool, textInput, placingText, selectedSticker, placingSticker, imageData, placingImage, color, addItem]);

  // --- Render ---
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-x-hidden bg-[#0f172a]">
      {/* Branding: solo visible en desktop */}
      <div className="hidden lg:flex fixed top-4 left-4 z-40 bg-black/60 rounded-xl px-4 py-2 shadow-lg border-2 border-cyan-400 flex-col items-start" style={{backdropFilter:'blur(4px)'}}>
        <span className="text-xl md:text-2xl font-extrabold text-cyan-300 drop-shadow-lg" style={{textShadow:'0 0 10px #22d3ee, 0 0 4px #fff'}}>🌟 Comunidad BWU</span>
        <span className="text-base text-blue-100 font-semibold italic mt-1" style={{textShadow:'0 0 4px #22d3ee'}}>¡Colabora, dibuja y comparte!</span>
      </div>
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex w-52 h-screen bg-[#18181b] border-r-4 border-blue-400 flex-col items-center py-8 gap-6 shadow-2xl backdrop-blur-md relative z-20 animate-fade-in-left">
        {/* Barra de opciones en desktop */}
        <nav className="flex flex-col items-center w-full gap-3 px-2 py-2">
          {TOOLBAR.map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setTool(key as Tool)}
              className={`flex flex-row items-center gap-2 px-3 py-3 rounded-2xl border-2 border-blue-400 font-bold text-base focus:outline-none transition-all duration-200 w-full ${tool === key ? "bg-gradient-to-r from-cyan-400 to-yellow-300 border-yellow-300 scale-105 shadow-xl ring-2 ring-yellow-300" : "bg-[#232b3b]/80 hover:bg-blue-900 hover:scale-105"}`}
              aria-pressed={tool === key}
              aria-label={label}
              title={label}
              style={{
                color: tool === key ? '#18181b' : '#bae6fd',
                fontSize: '1.5em',
                boxShadow: tool === key ? '0 0 18px #facc15, 0 0 8px #38bdf8' : '0 0 8px #38bdf8',
                letterSpacing: '1px',
                marginBottom: '4px',
                justifyContent: 'flex-start',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span style={{filter:'drop-shadow(0 0 6px #38bdf8)', fontSize:28}}>{icon}</span>
              <span className="inline ml-2 font-bold text-base" style={{fontFamily:'Montserrat, Impact, sans-serif'}}>{label}</span>
            </button>
          ))}
        </nav>
        {/* Color y grosor/pixel solo en desktop */}
                {/* Opciones avanzadas */}
                {tool === "text" && (
                  <div className="w-full flex flex-col items-center mt-4">
                    <input
                      type="text"
                      value={textInput}
                      onChange={e => setTextInput(e.target.value)}
                      placeholder="Escribe tu texto..."
                      className="w-11/12 px-2 py-1 rounded border-2 border-blue-400 bg-[#232b3b] text-blue-100 mb-2"
                    />
                    <button
                      className="bg-yellow-400 text-black font-bold px-3 py-1 rounded shadow"
                      onClick={() => setPlacingText(true)}
                      disabled={!textInput.trim()}
                    >Colocar texto</button>
                    {placingText && <span className="text-xs text-blue-300 mt-1">Haz clic en el canvas para colocar el texto</span>}
                  </div>
                )}
                {tool === "sticker" && (
                  <div className="w-full flex flex-col items-center mt-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {STICKERS.map((s, i) => (
                        <button key={i} className={`p-1 rounded ${selectedSticker === s ? 'bg-yellow-300 ring-2 ring-yellow-400' : 'bg-[#232b3b]'}`} onClick={() => setSelectedSticker(s)}>
                          {s.startsWith('/') ? <img src={s} alt="sticker" className="w-8 h-8" /> : <span style={{fontSize:28}}>{s}</span>}
                        </button>
                      ))}
                    </div>
                    {selectedSticker && (
                      <div className="flex flex-col items-center mt-2">
                        <span className="text-xs text-blue-300 mb-1">Previsualización:</span>
                        {selectedSticker.startsWith('/') ? <img src={selectedSticker} alt="preview" className="w-12 h-12" /> : <span style={{fontSize:40}}>{selectedSticker}</span>}
                      </div>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button
                        className="bg-yellow-400 text-black font-bold px-3 py-1 rounded shadow"
                        onClick={() => setPlacingSticker(true)}
                        disabled={!selectedSticker || placingSticker}
                      >Colocar sticker</button>
                      {placingSticker && (
                        <button
                          className="bg-red-400 text-white font-bold px-2 py-1 rounded shadow"
                          onClick={() => { setPlacingSticker(false); setSelectedSticker(null); }}
                        >Cancelar</button>
                      )}
                    </div>
                    {placingSticker && <span className="text-xs text-blue-300 mt-1">Haz clic en el canvas para colocar el sticker</span>}
                  </div>
                )}
                {tool === "image" && (
                  <div className="w-full flex flex-col items-center mt-4">
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = ev => setImageData(ev.target?.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="mb-2"
                    />
                    {imageData && (
                      <div className="flex flex-col items-center mt-2">
                        <span className="text-xs text-blue-300 mb-1">Previsualización:</span>
                        <img src={imageData} alt="preview" className="w-20 h-20 object-contain border-2 border-blue-400 rounded" />
                      </div>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button
                        className="bg-yellow-400 text-black font-bold px-3 py-1 rounded shadow"
                        onClick={() => setPlacingImage(true)}
                        disabled={!imageData || placingImage}
                      >Colocar imagen</button>
                      {placingImage && (
                        <button
                          className="bg-red-400 text-white font-bold px-2 py-1 rounded shadow"
                          onClick={() => { setPlacingImage(false); setImageData(null); }}
                        >Cancelar</button>
                      )}
                    </div>
                    {placingImage && <span className="text-xs text-blue-300 mt-1">Haz clic en el canvas para colocar la imagen</span>}
                  </div>
                )}
        <div className="mt-6 flex flex-col items-center gap-2 w-full">
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className="w-10 h-10 border-2 border-blue-400 rounded-full shadow cursor-pointer"
            aria-label="Color de trazo"
            style={{boxShadow:'0 0 8px #38bdf8'}}
          />
          <span className="text-blue-400 text-xs font-bold" style={{textShadow:'0 0 4px #38bdf8'}}>{color.toUpperCase().slice(0, 7)}</span>
          {tool === "draw" && (
            <input
              type="range"
              min={1}
              max={32}
              value={lineWidth}
              onChange={e => setLineWidth(Number(e.target.value))}
              className="accent-yellow-400 w-24 mt-2"
              aria-label="Grosor de línea"
              style={{boxShadow:'0 0 8px #facc15'}}
            />
          )}
          {tool === "pixel" && (
            <input
              type="range"
              min={4}
              max={32}
              value={pixelSize}
              onChange={e => setPixelSize(Number(e.target.value))}
              className="accent-yellow-400 w-24 mt-2"
              aria-label="Tamaño de pixel"
              style={{boxShadow:'0 0 8px #facc15'}}
            />
          )}
        </div>
      </aside>
      {/* Toolbar horizontal mobile/tablet */}
      <nav className="flex lg:hidden fixed top-0 left-0 z-50 w-screen px-2 py-3 gap-3 border-b-4 border-blue-400 shadow-2xl backdrop-blur-md bg-[#18181bcc]" style={{minHeight:'64px', maxHeight:'64px', borderRadius:'0 0 18px 18px'}}>
        {TOOLBAR.map(({ key, icon, label }) => (
          <button
            key={key}
            onClick={() => setTool(key as Tool)}
            className={`flex flex-col items-center justify-center min-w-[56px] h-14 rounded-2xl border-2 border-blue-400 focus:outline-none font-bold text-xs transition-all duration-200 ${tool === key ? "bg-gradient-to-br from-cyan-400 to-yellow-300 border-yellow-300 scale-110 shadow-2xl ring-2 ring-yellow-300" : "bg-[#232b3b]/80 hover:bg-blue-900 hover:scale-105"}`}
            aria-pressed={tool === key}
            aria-label={label}
            title={label}
            style={{
              color: tool === key ? '#18181b' : '#bae6fd',
              fontSize: '2em',
              margin:'0 4px',
              padding:'4px 0',
              touchAction:'manipulation',
              boxShadow: tool === key ? '0 0 18px #facc15, 0 0 8px #38bdf8' : '0 0 8px #38bdf8',
              transition:'box-shadow 0.2s, transform 0.2s',
              backdropFilter:'blur(8px)',
            }}
          >
            <span style={{fontSize:32, filter: tool === key ? 'drop-shadow(0 0 8px #facc15)' : 'drop-shadow(0 0 4px #38bdf8)'}}>{icon}</span>
            <span className="hidden sm:inline text-xs font-bold mt-1" style={{fontFamily:'Montserrat, Impact, sans-serif', letterSpacing:'1px'}}>{label}</span>
          </button>
        ))}
        {/* Color y grosor/pixel en mobile/tablet */}
        <div className="flex flex-col items-center gap-1 ml-2">
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className="w-8 h-8 border-2 border-blue-400 rounded-full shadow cursor-pointer"
            aria-label="Color de trazo"
            style={{boxShadow:'0 0 8px #38bdf8'}}
          />
          <span className="text-blue-400 text-xs font-bold" style={{textShadow:'0 0 4px #38bdf8'}}>{color.toUpperCase().slice(0, 7)}</span>
        </div>
        {tool === "draw" && (
          <input
            type="range"
            min={1}
            max={32}
            value={lineWidth}
            onChange={e => setLineWidth(Number(e.target.value))}
            className="ml-2 accent-yellow-400 w-20"
            aria-label="Grosor de línea"
            style={{boxShadow:'0 0 8px #facc15'}}
          />
        )}
        {tool === "pixel" && (
          <input
            type="range"
            min={4}
            max={32}
            value={pixelSize}
            onChange={e => setPixelSize(Number(e.target.value))}
            className="ml-2 accent-yellow-400 w-20"
            aria-label="Tamaño de pixel"
            style={{boxShadow:'0 0 8px #facc15'}}
          />
        )}
      </nav>
      {/* Canvas principal */}
      {/* Canvas principal: solución drástica para móvil/tablet */}
      <main
        className="flex-1 flex flex-col items-center justify-center px-0 md:px-0 min-h-0 animate-fade-in bg-[#0f172a]"
      >
        <div
          className="w-full h-[calc(100vh-56px)] lg:h-screen flex items-center justify-center"
          style={{
            top: 56,
            height: 'calc(100vh - 56px)',
            background: '#0f172a',
          }}
        >
          <BoardCanvas
            items={items}
            tool={tool}
            color={color}
            lineWidth={lineWidth}
            pixelSize={pixelSize}
            onDrawEnd={handleDrawEnd}
            onCanvasClick={(pos: {x: number, y: number}) => {
              // Siempre usar la posición del click para colocar
              if ((tool === 'text' && placingText) || (tool === 'sticker' && placingSticker) || (tool === 'image' && placingImage)) {
                handleCanvasClick(pos);
                setPreviewPos(null);
              }
            }}
            previewSticker={tool === 'sticker' && placingSticker ? selectedSticker : null}
            previewImage={tool === 'image' && placingImage ? imageData : null}
            previewPos={previewPos}
            onPreviewMove={pos => setPreviewPos(pos)}
          />
        </div>
      </main>
    </div>
  );
};

export default CommunityBoard;

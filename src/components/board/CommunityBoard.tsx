import React, { useRef, useState, useCallback, useMemo } from "react";
import { useBoardStore } from "./boardStore";
import { uid } from "./board.utils";
import { BoardItemType } from "./types";
import BoardCanvas from "./BoardCanvas";

const STICKERS = [
  "/imgs/Firstuke2.png",
  "/imgs/CanYouFeelItCharley2.png",
  "😀","🎸","🔥","🌈","✨"
];


export default function CommunityBoard() {
  const { items, setItems, addItem, color, setColor } = useBoardStore();
  const [tool, setTool] = useState("draw");
  const [lineWidth, setLineWidth] = useState(4);
  const [pixelSize, setPixelSize] = useState<number>(16);
  const [textInput, setTextInput] = useState("");
  const [placingImage, setPlacingImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Modular handlers para cada herramienta
  const handleDrawEnd = useCallback((points: number[]) => {
    if (tool === "draw") {
      const item = {
        id: uid(),
        type: "draw" as BoardItemType,
        data: { points, color, strokeWidth: lineWidth, brushType: "round" },
        x: 0, y: 0, scale: 1, rotation: 0, authorId: "anon", color, layer: "default", createdAt: new Date()
      };
      addItem(item);
    } else if (tool === "erase") {
      // Borrador: elimina líneas que intersectan con el trazo
      // (Implementación simple: elimina el último elemento tipo draw)
      const lastDraw = [...items].reverse().find(i => i.type === "draw");
      if (lastDraw) setItems(items.filter(i => i.id !== lastDraw.id));
    } else if (tool === "pixel") {
      // Pixel art: cada click agrega un cuadrado
      if (points.length >= 2) {
        const [x, y] = points;
        const size = pixelSize;
        const item = {
          id: uid(),
          type: "draw" as BoardItemType,
          data: { points: [x, y, x+size, y, x+size, y+size, x, y+size, x, y], color, strokeWidth: 1, brushType: "pixel", pixelSize: size },
          x, y, scale: 1, rotation: 0, authorId: "anon", color, layer: "default", createdAt: new Date()
        };
        addItem(item);
      }
    }
  }, [addItem, color, lineWidth, tool, items, setItems, pixelSize]);

  const handleAddText = useCallback(() => {
    if (!textInput.trim()) return;
    const item = {
      id: uid(),
      type: "text" as BoardItemType,
      data: { text: textInput },
      x: 100 + Math.random() * 400,
      y: 100 + Math.random() * 200,
      scale: 1, rotation: 0, authorId: "anon", color, layer: "default", createdAt: new Date()
    };
    addItem(item);
    setTextInput("");
  }, [addItem, textInput, color]);

  const handleAddSticker = useCallback((src: string) => {
    const item = {
      id: uid(),
      type: "sticker" as BoardItemType,
      data: { src },
      x: 120 + Math.random() * 400,
      y: 120 + Math.random() * 200,
      scale: 1, rotation: 0, authorId: "anon", color: undefined, layer: "default", createdAt: new Date()
    };
    addItem(item);
  }, [addItem]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPlacingImage((ev.target?.result as string) || null);
    reader.readAsDataURL(file);
  };

  const handleAddImage = useCallback((src: string) => {
    const item = {
      id: uid(),
      type: "image" as BoardItemType,
      data: { src },
      x: 200 + Math.random() * 300,
      y: 200 + Math.random() * 200,
      scale: 1, rotation: 0, authorId: "anon", color: undefined, layer: "default", createdAt: new Date()
    };
    addItem(item);
    setPlacingImage(null);
  }, [addItem]);

  const handleClear = useCallback(() => setItems([]), [setItems]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-radial from-[#232b3b] to-[#18181b]">
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-3xl font-bold text-cyan-400 mb-2 text-center">Pizarrón Comunitario</h2>
        <p className="text-center text-white mb-4">Colabora, dibuja y comparte con la comunidad.</p>
        {/* Barra de herramientas */}
        <div className="flex flex-wrap gap-2 mb-4 items-center justify-center">
          {[
            { key: "draw", label: "Dibujar" },
            { key: "erase", label: "Borrar" },
            { key: "text", label: "Texto" },
            { key: "sticker", label: "Sticker" },
            { key: "pixel", label: "Pixel Art" },
            { key: "image", label: "Imagen" },
            { key: "move", label: "Mover" },
          ].map(btn => (
            <button key={btn.key} onClick={() => setTool(btn.key)} className={tool===btn.key ? "bg-cyan-400 text-black px-4 py-2 rounded" : "bg-gray-700 text-white px-4 py-2 rounded"}>{btn.label}</button>
          ))}
          <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="ml-2 w-8 h-8 border-2 border-cyan-400 rounded-full" />
          {tool==="draw" && (
            <input type="range" min={1} max={32} value={lineWidth} onChange={e=>setLineWidth(Number(e.target.value))} className="ml-2" />
          )}
          {tool==="pixel" && (
            <input type="range" min={4} max={32} value={pixelSize} onChange={e=>setPixelSize(Number(e.target.value))} className="ml-2" />
          )}
          <button onClick={handleClear} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">Limpiar</button>
        </div>
        {/* Herramientas específicas */}
        {tool==="text" && (
          <div className="flex gap-2 mb-4 justify-center">
            <input type="text" value={textInput} onChange={e=>setTextInput(e.target.value)} placeholder="Escribe algo..." className="px-3 py-2 rounded border border-cyan-400" />
            <button onClick={handleAddText} className="bg-yellow-300 text-black px-4 py-2 rounded">Colocar</button>
          </div>
        )}
        {tool==="sticker" && (
          <div className="flex gap-2 mb-4 justify-center">
            {STICKERS.map((src, i) => (
              <button key={i} onClick={() => handleAddSticker(src)} className="bg-white border-2 border-cyan-400 rounded p-1">
                {src.startsWith("/") ? <img src={src} alt="sticker" className="w-8 h-8" /> : <span className="text-2xl">{src}</span>}
              </button>
            ))}
          </div>
        )}
        {tool==="image" && (
          <div className="flex gap-2 mb-4 justify-center">
            <input ref={fileInputRef} type="file" accept="image/*" style={{display:'none'}} onChange={handleImageUpload} />
            <button onClick={()=>fileInputRef.current?.click()} className="bg-yellow-300 text-black px-4 py-2 rounded">Subir Imagen</button>
            {placingImage && (
              <button onClick={()=>handleAddImage(placingImage)} className="bg-cyan-400 text-black px-4 py-2 rounded">Colocar Imagen</button>
            )}
          </div>
        )}
        {/* Canvas principal */}
        <div className="bg-[#232b3b] border-2 border-cyan-400 rounded-xl shadow-lg p-2 mb-2 w-full min-h-[500px] flex flex-col items-center relative">
          <BoardCanvas
            items={items}
            onDrawEnd={handleDrawEnd}
            tool={tool}
            color={color}
            lineWidth={lineWidth}
            pixelSize={pixelSize}
          />
          {items.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl opacity-60 pointer-events-none">¡Empieza a crear en el pizarrón!</div>
          )}
        </div>
      </div>
    </div>
  );
}

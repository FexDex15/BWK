import { useState } from "react";

export default function MessageInput({
  value,
  setValue,
  onSend,
}: any) {
  const [mode, setMode] = useState<"text" | "image" | "gif">("text");

  return (
    <div className="flex gap-2 p-3 bg-black/30 backdrop-blur">
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as any)}
        className="bg-black/40 text-xs rounded px-2"
      >
        <option value="text">Texto</option>
        <option value="image">Imagen URL</option>
        <option value="gif">GIF URL</option>
      </select>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={
          mode === "text"
            ? "Escribe un mensaje…"
            : "Pega una URL…"
        }
        className="flex-1 rounded-xl px-4 py-2 bg-black/40"
      />

      <button onClick={() => onSend(mode)} className="btn px-4">
        ➤
      </button>
    </div>
  );
}

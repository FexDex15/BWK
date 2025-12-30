import { useBoardStore } from "./boardStore";

export default function BoardToolbar() {
  const { tool, setTool, color, setColor } = useBoardStore();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 p-3 rounded-2xl backdrop-blur">
      {["pen", "text", "move", "eraser"].map((t) => (
        <button
          key={t}
          onClick={() => setTool(t as any)}
          className={`px-3 py-1 rounded ${
            tool === t ? "bg-cyan-400/30" : "bg-white/10"
          }`}
        >
          {t}
        </button>
      ))}

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-8 h-8"
      />
    </div>
  );
}

import { BoardTool } from "../board.types";

export default function BoardToolbar({
  tool,
  setTool,
}: {
  tool: BoardTool;
  setTool: (t: BoardTool) => void;
}) {
  return (
    <div className="flex gap-2 p-2 bg-black/40 rounded-xl">
      {["draw", "text", "image", "sticker"].map((t) => (
        <button
          key={t}
          onClick={() => setTool(t as BoardTool)}
          className={`px-3 py-1 rounded ${
            tool === t ? "bg-cyan-400/40" : "bg-black/30"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

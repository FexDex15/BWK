import { useState } from "react";
import { BoardItem } from "../board.types";
import { uid } from "../board.utils";

export function useBoardDraw(user: any) {
  const [lines, setLines] = useState<BoardItem[]>([]);
  const [drawing, setDrawing] = useState(false);

  const startDraw = (pos: { x: number; y: number }) => {
    if (!user) return;

    setDrawing(true);
    setLines((l) => [
      ...l,
      {
        id: uid(),
        type: "draw",
        points: [pos.x, pos.y],
        color: "#22d3ee",
        strokeWidth: 3,
        uid: user.uid,
      },
    ]);
  };

  const draw = (pos: { x: number; y: number }) => {
    if (!drawing) return;

    setLines((l) => {
      const last = l[l.length - 1];
      if (last.type === "draw") {
        last.points.push(pos.x, pos.y);
      }
      return [...l.slice(0, -1), last];
    });
  };

  const endDraw = () => setDrawing(false);

  return { lines, setLines, startDraw, draw, endDraw };
}

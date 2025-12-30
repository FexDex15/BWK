import { create } from "zustand";
import { BoardItem } from "./types";

interface BoardState {
  items: BoardItem[];
  tool: "pen" | "text" | "move" | "eraser";
  color: string;
  setItems: (i: BoardItem[]) => void;
  addItem: (i: BoardItem) => void;
  setTool: (t: BoardState["tool"]) => void;
  setColor: (c: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  items: [],
  tool: "pen",
  color: "#22d3ee",
  setItems: (items) => set({ items }),
  addItem: (item) =>
    set((s) => ({ items: [...s.items, item] })),
  setTool: (tool) => set({ tool }),
  setColor: (color) => set({ color }),
}));

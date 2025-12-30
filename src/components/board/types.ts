import { Timestamp } from "firebase/firestore";

export type BoardItemType =
  | "draw"
  | "text"
  | "image"
  | "gif"
  | "sticker";

export interface BoardItem {
  id: string;
  type: BoardItemType;
  data: any;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  authorId: string;
  color?: string;
  layer: string;
  createdAt: Timestamp;
}

// Tipos unificados y extensibles para elementos del board
export type BoardItemType = "draw" | "text" | "image" | "sticker";

export interface DrawData {
  points: number[];
  color: string;
  strokeWidth: number;
  brushType?: string;
  pixelSize?: number;
}

export interface TextData {
  text: string;
}

export interface ImageData {
  src: string;
}

export interface StickerData {
  src: string;
}

export interface BoardItemBase {
  id: string;
  type: BoardItemType;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  authorId: string;
  color?: string;
  layer: string;
  createdAt: Date;
}

export type BoardItem =
  | (BoardItemBase & { type: "draw"; data: DrawData })
  | (BoardItemBase & { type: "text"; data: TextData })
  | (BoardItemBase & { type: "image"; data: ImageData })
  | (BoardItemBase & { type: "sticker"; data: StickerData });

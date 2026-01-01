export type BoardTool = "draw" | "text" | "sticker";
export type BoardItem =
  | {
      id: string;
      type: "draw";
      points: number[];
      color: string;
      strokeWidth: number;
      uid: string;
    }
  | {
      id: string;
      type: "text";
      text: string;
      x: number;
      y: number;
      color: string;
      uid: string;
    }
  | {
      id: string;
      type: "sticker";
      src: string;
      x: number;
      y: number;
      uid: string;
    };

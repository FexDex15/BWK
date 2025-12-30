import { Timestamp } from "firebase/firestore";

export interface Message {
  id: string;
  text: string;
  from: string;
  fromUid: string;
  date: Timestamp;
  type: "text" | "image" | "gif";
  pinned: boolean;
  edited?: boolean;

  replyTo?: {
    id: string;
    text: string;
    from: string;
  } | null;

  reactions?: Record<string, string[]>;

  privateTo?: string | null; // UID si es mensaje privado
}

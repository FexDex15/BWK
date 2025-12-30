import { Message } from "./types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAuthor?: boolean;
  onReply?: (msg: Message) => void;
}

export default function MessageBubble({
  message,
  isOwn,
  showAuthor,
  onReply,
}: MessageBubbleProps) {
  // Pin/unpin message with error handling
  const pin = async () => {
    try {
      await updateDoc(doc(db, "mensajes", message.id), {
        pinned: !message.pinned,
      });
    } catch (e) {
      // Optionally show error to user
      // console.error("Error updating pin:", e);
    }
  };

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[75%] p-4 rounded-3xl text-sm
          ${
            message.pinned
              ? "border border-yellow-400 bg-yellow-400/10"
              : isOwn
              ? "bg-cyan-400/15 border border-cyan-400/30"
              : "bg-white/10 border border-white/10"
          }
        `}
      >
        {showAuthor && (
          <span
            className="block text-xs text-cyan-300/70 cursor-pointer hover:underline"
            onClick={() => onReply?.(message)}
          >
            {message.from}
          </span>
        )}

        {message.replyTo && (
          <div className="text-xs bg-black/30 p-2 rounded mb-1">
            ↪ {message.replyTo.from}: {message.replyTo.text.slice(0, 60)}
          </div>
        )}

        <p className="leading-relaxed">{message.text}</p>

        <div className="flex gap-3 mt-2 text-xs opacity-70">
          <button
            onClick={() => onReply?.(message)}
            className="hover:underline"
          >
            Responder
          </button>

          <button onClick={pin} className="hover:underline">
            {message.pinned ? "Desfijar" : "Fijar"}
          </button>
        </div>
      </div>
    </div>
  );
}

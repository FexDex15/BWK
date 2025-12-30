import { RefObject, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "./types";

interface ChatBoxProps {
  messages: Message[];
  currentUid: string;
  bottomRef: RefObject<HTMLDivElement>;
  onReply?: (msg: Message) => void;
}

export default function ChatBox({
  messages,
  currentUid,
  bottomRef,
  onReply,
}: ChatBoxProps) {
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, bottomRef]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-black/10">
      {messages.map((message, index) => {
        const prev = messages[index - 1];
        const showAuthor = !prev || prev.fromUid !== message.fromUid;
        return (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.fromUid === currentUid}
            showAuthor={showAuthor}
            onReply={onReply}
          />
        );
      })}
      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}

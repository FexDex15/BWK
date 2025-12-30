
import { useEffect, useRef, useState, useCallback } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, db } from "../../firebase";
import ChatBox from "./ChatBox";
import CommunityLayout from "./CommunityLayout";
import UserMiniProfile from "./UserMiniProfile";
import CommunitySidebar from "./CommunitySidebar";
import { Message } from "./types";

export default function CommunityChat() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // AUTH: subscribe and clean up
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  // CHAT: subscribe to messages
  useEffect(() => {
    const q = query(
      collection(db, "mensajes"),
      orderBy("pinned", "desc"),
      orderBy("date", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((d) => {
          const data = d.data() as DocumentData;
          return {
            id: d.id,
            text: data.text ?? "",
            from: data.from ?? "",
            fromUid: data.fromUid ?? "",
            date: data.date ?? null,
            type: data.type ?? "text",
            pinned: !!data.pinned,
            edited: !!data.edited,
            replyTo: data.replyTo ?? null,
            reactions: data.reactions ?? {},
            privateTo: data.privateTo ?? null,
          } as Message;
        })
      );
    });
    return () => unsub();
  }, []);

  // SEND: memoized to avoid stale closure
  const sendMessage = useCallback(async () => {
    if (!text.trim() || !user) return;
    const temp = text;
    setText("");
    setReplyTo(null);
    await addDoc(collection(db, "mensajes"), {
      text: temp,
      from: user.displayName || user.email,
      fromUid: user.uid,
      date: serverTimestamp(),
      type: "text",
      replyTo: replyTo
        ? {
            id: replyTo.id,
            text: replyTo.text,
            from: replyTo.from,
          }
        : null,
      reactions: {},
      pinned: false,
    });
  }, [text, user, replyTo]);

  if (!user) return null;

  return (
    <CommunityLayout>
      <div className="flex flex-1 gap-6 max-w-5xl mx-auto px-4">
        {/* SIDEBAR */}
        <aside className="hidden lg:block w-64 shrink-0">
          <CommunitySidebar user={user} onLogout={() => signOut(auth)} />
        </aside>

        {/* CHAT */}
        <div className="flex flex-col flex-1 min-h-[75vh]">
          {/* HEADER */}
          <div className="py-4 shrink-0">
            <UserMiniProfile user={user} />
          </div>

          {/* MENSAJES */}
          <div className="flex-1 min-h-0">
            <ChatBox
              messages={messages}
              currentUid={user.uid}
              bottomRef={bottomRef}
              onReply={setReplyTo}
            />
          </div>

          {/* REPLY */}
          {replyTo && (
            <div className="text-xs bg-black/30 p-2 text-cyan-300">
              Respondiendo a {replyTo.from}: “{replyTo.text.slice(0, 40)}…”
              <button
                onClick={() => setReplyTo(null)}
                className="ml-2 text-red-400"
              >
                ✕
              </button>
            </div>
          )}

          {/* INPUT */}
          <div className="flex gap-2 p-3 bg-black/20 backdrop-blur shrink-0">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe algo…"
              className="flex-1 rounded-xl px-4 py-2 bg-black/30 text-white"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="px-4 btn">
              ➤
            </button>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}

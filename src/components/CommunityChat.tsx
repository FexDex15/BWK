// src/components/CommunityChat.tsx
import { useEffect, useRef, useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function CommunityChat() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  /* ---------------- AUTH ---------------- */
  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  /* ---------------- CHAT ---------------- */
  useEffect(() => {
    const q = query(collection(db, "mensajes"), orderBy("date", "asc"));
    return onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    });
  }, []);

  /* ---------------- ACTIONS ---------------- */
  const loginEmail = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const loginGoogle = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const sendMessage = async () => {
    if (!text.trim() || !user) return;
    await addDoc(collection(db, "mensajes"), {
      text,
      from: user.email,
      fromUid: user.uid,
      to: "public",
      date: serverTimestamp(),
    });
    setText("");
  };

  /* ---------------- UI ---------------- */
  if (!user) {
    return (
      <form
        onSubmit={loginEmail}
        className="max-w-sm mx-auto mt-24 p-6 bg-black/70 rounded-xl space-y-3"
      >
        <h2 className="text-center text-cyan-400 text-xl">👋 Comunidad</h2>
        <input name="email" type="email" placeholder="Correo" className="w-full p-2 rounded bg-gray-900 text-white" />
        <input name="password" type="password" placeholder="Contraseña" className="w-full p-2 rounded bg-gray-900 text-white" />
        <button className="w-full bg-gradient-to-r from-cyan-400 to-pink-400 p-2 rounded font-bold">
          Entrar
        </button>
        <button type="button" onClick={loginGoogle} className="w-full bg-white text-black p-2 rounded font-bold">
          Google
        </button>
      </form>
    );
  }

  return (
    <section className="max-w-5xl mx-auto mt-6 bg-black/60 rounded-xl p-4 flex flex-col h-[80vh]">
      <header className="text-cyan-400 text-center font-semibold">💬 Chat Público</header>

      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {messages.map(m => (
          <div
            key={m.id}
            className={`p-2 rounded max-w-xs ${
              m.fromUid === user.uid
                ? "ml-auto bg-cyan-500/20"
                : "bg-white/10"
            }`}
          >
            <strong className="text-cyan-300 text-sm">{m.from}</strong>
            {m.text.match(/\.(png|jpg|gif)$/i) ? (
              <img src={m.text} className="rounded mt-1" />
            ) : (
              <p>{m.text}</p>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-gray-900 p-2 rounded"
          placeholder="Escribe..."
        />
        <button onClick={sendMessage} className="bg-gradient-to-r from-cyan-400 to-pink-400 px-4 rounded">
          Enviar
        </button>
      </div>

      <button
        onClick={() => signOut(auth)}
        className="text-red-400 text-sm mt-2 self-end"
      >
        Cerrar sesión
      </button>
    </section>
  );
}

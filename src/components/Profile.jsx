// src/components/Profile.jsx
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile({ currentUser, nickname, setNickname, bio, setBio, avatar }) {
  const [editing, setEditing] = useState(false);

  const saveProfile = async () => {
    await updateDoc(doc(db, "usuarios", currentUser.uid), {
      nickname,
      bio,
    });
    setEditing(false);
  };

  return (
    <aside className="bg-black/50 backdrop-blur-md p-4 rounded-lg flex flex-col items-center min-w-[280px] max-w-[320px] hidden md:flex">
      <div className="w-36 h-36 rounded-full overflow-hidden relative mb-3">
        <img src={avatar} alt="avatar" className="w-full h-full object-cover border-2 border-cyan-400" />
      </div>
      <h3 className="text-cyan-400">{nickname}</h3>
      <p className="text-gray-300">{currentUser.email}</p>
      {editing && (
        <>
          <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} className="p-1 rounded bg-white/10 text-white w-full mt-2" />
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="p-1 rounded bg-white/10 text-white w-full mt-2" />
          <button className="bg-gradient-to-r from-cyan-400 to-pink-400 p-2 rounded text-white mt-2" onClick={saveProfile}>💾 Guardar</button>
        </>
      )}
      <button className="bg-white/10 text-white p-2 rounded mt-2" onClick={() => setEditing(!editing)}>
        {editing ? "❌ Cancelar" : "✏️ Editar Perfil"}
      </button>
    </aside>
  );
}

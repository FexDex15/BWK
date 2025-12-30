import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";

export default function EditProfileModal({ uid, onClose }: any) {
  const [bio, setBio] = useState("");
  const [color, setColor] = useState("#00ffff");

  const save = async () => {
    await updateDoc(doc(db, "users", uid), {
      bio,
      color,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-black/80 border border-cyan-400/30 rounded-2xl p-6 w-80">
        <h3 className="text-cyan-300 mb-4">Editar perfil</h3>

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full bg-black/60 border border-cyan-400/30 rounded p-2 text-white mb-3"
        />

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 mb-4"
        />

        <button onClick={save} className="btn w-full">
          Guardar
        </button>
      </div>
    </div>
  );
}

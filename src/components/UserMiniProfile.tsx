import { useEffect, useState } from "react";
import { User, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

interface Props {
  user: User;
}

export default function UserMiniProfile({ user }: Props) {
  const isOwnProfile = auth.currentUser?.uid === user.uid;

  const [open, setOpen] = useState(false);

  const [profile, setProfile] = useState<any>(null);

  const [name, setName] = useState(user.displayName || "");
  const [photo, setPhoto] = useState(user.photoURL || "");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState<"online" | "away" | "busy">("online");
  const [themeColor, setThemeColor] = useState("#22d3ee");

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const load = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          bio: "",
          status: "online",
          themeColor: "#22d3ee",
          messagesCount: 0,
          createdAt: new Date(),
        });
      }

      const data = (await getDoc(ref)).data();
      setProfile(data);
      setBio(data?.bio || "");
      setStatus(data?.status || "online");
      setThemeColor(data?.themeColor || "#22d3ee");
    };

    load();
  }, [user.uid]);

  if (!profile) return null;

  /* ================= SAVE ================= */
  const save = async () => {
    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });

    await updateDoc(doc(db, "users", user.uid), {
      bio,
      status,
      themeColor,
    });

    setOpen(false);
  };

  return (
    <div className="flex items-center gap-4 bg-black/30 p-4 rounded-2xl backdrop-blur">
      {/* AVATAR */}
      <div className="relative">
        <img
          src={photo || "/imgs/default-avatar.png"}
          className="w-14 h-14 rounded-full object-cover border-2"
          style={{ borderColor: themeColor }}
          title={bio || "Sin biografía"}
        />

        {/* STATUS DOT */}
        <span
          className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border border-black
            ${
              status === "online"
                ? "bg-green-400"
                : status === "away"
                ? "bg-yellow-400"
                : "bg-red-400"
            }
          `}
        />
      </div>

      {/* INFO */}
      <div className="flex-1">
        <p className="font-semibold">{name || "Usuario"}</p>
        <p className="text-xs opacity-70">{user.email}</p>
      </div>

      {/* ACTION */}
      {isOwnProfile && (
        <button
          onClick={() => setOpen(true)}
          className="text-xs px-3 py-1 rounded-xl bg-cyan-400/20 hover:bg-cyan-400/30 transition"
        >
          Editar perfil
        </button>
      )}

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-neutral-900 p-6 rounded-2xl w-full max-w-sm space-y-3">
            <h3 className="font-semibold mb-2">Editar perfil</h3>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              className="w-full px-3 py-2 rounded bg-black/40"
            />

            <input
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="URL de avatar"
              className="w-full px-3 py-2 rounded bg-black/40"
            />

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              className="w-full px-3 py-2 rounded bg-black/40 resize-none"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "online" | "away" | "busy")
              }
              className="w-full px-3 py-2 rounded bg-black/40"
            >
              <option value="online">Online</option>
              <option value="away">Ausente</option>
              <option value="busy">Ocupado</option>
            </select>

            <input
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="w-full h-10 rounded"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setOpen(false)}
                className="text-sm opacity-70"
              >
                Cancelar
              </button>
              <button
                onClick={save}
                className="text-sm px-4 py-1 rounded bg-cyan-400/30"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

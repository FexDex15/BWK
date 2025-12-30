import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function ProfilePanel({ uid }: { uid: string }) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const ref = doc(db, "users", uid);
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) setProfile(snap.data());
    });
  }, [uid]);

  if (!profile) return null;

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-cyan-400/20
      bg-black/50 backdrop-blur-md"
    >
      {/* Banner */}
      <div
        className="h-24 bg-cover bg-center"
        style={{ backgroundImage: `url(${profile.banner})` }}
      />

      {/* Avatar */}
      <img
        src={profile.avatar}
        className="w-20 h-20 rounded-full border-4 border-black
        absolute -bottom-10 left-4 bg-black"
      />

      <div className="pt-12 px-4 pb-4">
        <h3 className="text-cyan-300">{profile.displayName}</h3>
        <p className="text-xs text-white/70">{profile.bio}</p>

        <span
          className="inline-block mt-2 text-xs px-2 py-1 rounded"
          style={{ backgroundColor: profile.color }}
        >
          {profile.status}
        </span>
      </div>
    </div>
  );
}

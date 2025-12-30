import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function TypingIndicator({ currentUid }: { currentUid: string }) {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    return onSnapshot(collection(db, "typing"), (snap) => {
      setUsers(
        snap.docs
          .filter((d) => d.id !== currentUid)
          .map((d) => d.data().name)
      );
    });
  }, []);

  if (!users.length) return null;

  return (
    <div className="text-xs text-cyan-300 px-4 pb-1">
      ✍️ {users.join(", ")} escribiendo…
    </div>
  );
}

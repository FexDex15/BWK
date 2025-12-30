import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect } from "react";
import { useBoardStore } from "./boardStore";

export function useBoardSync() {
  const setItems = useBoardStore((s) => s.setItems);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "board"), (snap) => {
      setItems(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as any
      );
    });

    return () => unsub();
  }, []);
}

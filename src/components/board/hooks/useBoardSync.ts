import { useEffect } from "react";
import {
  collection,
  onSnapshot,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { BoardItem } from "../board.types";
export function useBoardSync(
  elements: BoardItem[],
  setElements: (e: BoardItem[]) => void
) {
  console.log("Syncing board...", elements);
  useEffect(() => {
    const ref = collection(db, "board");

    return onSnapshot(ref, (snap) => {
      setElements(
        snap.docs.map((d) => d.data() as BoardItem)
      );
    });
  }, []);

  const pushElement = async (el: BoardItem) => {
    await addDoc(collection(db, "board"), {
      ...el,
      createdAt: serverTimestamp(),
    });
  };

  return { pushElement };
}

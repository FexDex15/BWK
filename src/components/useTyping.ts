import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const setTyping = async (uid: string, name: string) => {
  await setDoc(doc(db, "typing", uid), {
    name,
    timestamp: Date.now(),
  });
};

export const clearTyping = async (uid: string) => {
  await deleteDoc(doc(db, "typing", uid));
};

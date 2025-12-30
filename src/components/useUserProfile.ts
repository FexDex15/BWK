import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { User } from "firebase/auth";

export async function getOrCreateProfile(user: User) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      displayName: user.displayName || "Usuario",
      bio: "",
      avatar: "/avatars/default.png",
      banner: "/banners/default.jpg",
      color: "#00ffff",
      status: "online",
      createdAt: new Date(),
    });
  }

  return ref;
}

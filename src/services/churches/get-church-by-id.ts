import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/services/firebase";

import { Church } from "@/types/church";

export async function getChurchById(churchId: string) {
  const churchRef = doc(db, "churches", churchId);
  const snapshot = await getDoc(churchRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<Church, "id">),
  } as Church;
}

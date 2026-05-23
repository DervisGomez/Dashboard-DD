import {
    doc,
    getDoc,
  } from "firebase/firestore";
  
  import { db } from "@/services/firebase";
  
  export async function getAdminByUid(
    uid: string
  ) {
    const docRef = doc(db, "admins", uid);
  
    const snapshot =
      await getDoc(docRef);
  
    if (!snapshot.exists()) {
      return null;
    }
  
    return snapshot.data();
  }
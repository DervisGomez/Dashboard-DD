import {
    doc,
    getDoc,
  } from "firebase/firestore";
  
  import { db }
    from "@/services/firebase";
  
  import { AppUser }
    from "@/types/user";
  
  export async function getUserById(
    id: string
  ) {
    const userRef = doc(
      db,
      "users",
      id
    );
  
    const snapshot =
      await getDoc(userRef);
  
    if (!snapshot.exists()) {
      return null;
    }
  
    return {
      id: snapshot.id,
  
      ...(snapshot.data() as Omit<
        AppUser,
        "id"
      >),
    };
  }
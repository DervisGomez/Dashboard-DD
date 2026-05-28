import {
    addDoc,
    collection,
  } from "firebase/firestore";
  
  import { db }
    from "@/services/firebase";
  
  interface CreateChurchData {
    name: string;
  
    city: string;
  
    country: string;
  
    code: string;
  }
  
  export async function createChurch({
    name,
    city,
    country,
    code,
  }: CreateChurchData) {
    await addDoc(
      collection(db, "churches"),
      {
        name,
        city,
        country,
        code,
  
        createdAt:
          new Date().toISOString(),
  
        updatedAt:
          new Date().toISOString(),
      }
    );
  }
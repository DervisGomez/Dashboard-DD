import {
    collection,
    getDocs,
    query,
    limit,
  } from "firebase/firestore";
  
  import { db }
    from "@/services/firebase";
  
  import { Church }
    from "@/types/church";
  
  export async function getChurches() {
    const churchesRef =
      collection(db, "churches");
  
    const churchesQuery =
      query(
        churchesRef,
        limit(50)
      );
  
    const snapshot =
      await getDocs(
        churchesQuery
      );
  
    const churches: Church[] =
      snapshot.docs.map((doc) => ({
        id: doc.id,
  
        ...(doc.data() as Omit<
          Church,
          "id"
        >),
      }));
  
    return churches;
  }
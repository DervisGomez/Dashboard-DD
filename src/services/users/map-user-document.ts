import {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import {
  AppUser,
} from "@/types/user";

export function mapUserDocument(
  doc: QueryDocumentSnapshot<DocumentData>
): AppUser {
  return {
    id: doc.id,

    ...(doc.data() as Omit<
      AppUser,
      "id"
    >),
  };
}

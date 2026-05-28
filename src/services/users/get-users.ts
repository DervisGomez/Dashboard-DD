import {
  httpsCallable,
} from "firebase/functions";

import {
  functions,
} from "@/services/firebase";

import {
  GetUsersOptions,
  GetUsersResult,
} from "./types";

const getUsersList =
  httpsCallable<
    Pick<
      GetUsersOptions,
      "search" |
      "profile" |
      "sort" |
      "direction" |
      "cursor" |
      "limit"
    >,
    GetUsersResult
  >(
    functions,
    "getUsersList"
  );

export async function getUsers(
  options: GetUsersOptions
) {
  const response =
    await getUsersList({
      search: options.search,
      profile: options.profile,
      sort: options.sort,
      direction: options.direction,
      cursor: options.cursor,
      limit: options.limit,
    });

  return response.data;
}

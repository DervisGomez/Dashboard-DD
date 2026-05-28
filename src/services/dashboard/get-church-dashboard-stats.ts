import {
  httpsCallable,
} from "firebase/functions";

import {
  functions,
} from "@/services/firebase";

import {
  GetChurchDashboardStatsResult,
} from "./types";

const getChurchDashboardStatsCallable =
  httpsCallable<
    {
      churchId?: string | null;
    },
    GetChurchDashboardStatsResult
  >(
    functions,
    "getChurchDashboardStats"
  );

export async function getChurchDashboardStats(
  churchId?: string | null
) {
  const response =
    await getChurchDashboardStatsCallable({
      churchId,
    });

  return response.data;
}

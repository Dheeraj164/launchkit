"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { dashboardData } from "../functions/dashboardData";

export interface DashboardDataType {
  error: string | null;
  workspace: {
    id: string;
    name: string;
    plan: "free" | "pro";
  } | null;
  teamCount: number | null;
  teamNames: { firstname: string; lastname: string }[] | null;
  usage: {
    total30d: number;
    quota: number;
    percentage: number;
    daily: { date: string; api_calls: number }[];
  } | null;
}

export async function getDashboardData() {
  // console.log("DASHBOARD FETCHED");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return await dashboardData({ supabase, userId: user.id });
}

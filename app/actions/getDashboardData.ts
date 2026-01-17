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

  // const { data: workspaces } = await supabase
  //   .from("workspaces")
  //   .select("id, name, plan")
  //   .eq("owner", user.id);

  // if (!workspaces || workspaces.length === 0)
  //   return [
  //     {
  //       error: "workspace not found",
  //       workspace: null,
  //       teamCount: null,
  //       teamNames: null,
  //       usage: null,
  //     },
  //   ];

  // const dashboards = await Promise.all(
  //   workspaces.map(async (workspace) => {
  //     /* TEAM */
  //     const { data: members } = await supabase
  //       .from("workspace_members")
  //       .select("userinfo(firstname, lastname)")
  //       .eq("workspace_id", workspace.id)
  //       .returns<
  //         {
  //           userinfo: {
  //             firstname: string;
  //             lastname: string;
  //           } | null;
  //         }[]
  //       >();

  //     const teamNames =
  //       members?.map((m) => ({
  //         firstname: m.userinfo?.firstname ?? "",
  //         lastname: m.userinfo?.lastname ?? "",
  //       })) ?? [];

  //     /* USAGE */
  //     const fromDate = new Date();
  //     fromDate.setDate(fromDate.getDate() - 30);
  //     const from = fromDate.toISOString().split("T")[0];

  //     const { data: usageRows } = await supabase
  //       .from("usage")
  //       .select("date, api_calls")
  //       .eq("workspace_id", workspace.id)
  //       .gte("date", from)
  //       .order("date", { ascending: true });

  //     const total30d =
  //       usageRows?.reduce((sum, row) => sum + row.api_calls, 0) ?? 0;

  //     // const quota = QUOTA[workspace.plan];
  //     const quota = QUOTA[workspace.plan === "free" ? "free" : "pro"];

  //     const percentage = Math.min(Math.round((total30d / quota) * 100), 100);

  //     return {
  //       error: null,
  //       workspace,
  //       teamCount: teamNames.length,
  //       teamNames,
  //       usage: {
  //         total30d,
  //         quota,
  //         percentage,
  //         daily: usageRows ?? [],
  //       },
  //     };
  //   })
  // );
  // workspaces.forEach(async (workspace) => {
  //   const { error } = await updateAPIUsage({ workspace_id: workspace.id });
  //   if (error)
  //     return {
  //       error: error,
  //       workspace: null,
  //       teamCount: null,
  //       teamNames: null,
  //       usage: null,
  //     };
  // });

  // return dashboards;
}

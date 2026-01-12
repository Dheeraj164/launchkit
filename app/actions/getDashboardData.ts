"use server";

import { DashboardDataType } from "@/utils/intefaces_types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const QUOTA = {
  free: 50_000,
  pro: 2_000_000,
};

type MemberRow = {
  userinfo: {
    firstname: string;
    lastname: string;
  } | null;
};

export async function getDashboardData(): Promise<DashboardDataType | null> {
  const supabase = await createClient();

  /* 1️⃣ AUTH */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    /* 2️⃣ WORKSPACE */
    const { data: workspace, error: workspaceError } = await supabase
      .from("workspaces")
      .select("id, name, plan")
      .eq("owner", user.id)
      .single();

    if (workspaceError || !workspace) {
      return null;
    }

    /* 3️⃣ TEAM MEMBERS (TYPE FIX HERE) */
    const { data: members } = await supabase
      .from("workspace_members")
      .select("userinfo(firstname, lastname)")
      .eq("workspace_id", workspace.id)
      .returns<MemberRow[]>(); // ✅ THIS IS THE KEY LINE

    const teamNames =
      members?.map((row) => ({
        firstname: row.userinfo?.firstname ?? "",
        lastname: row.userinfo?.lastname ?? "",
      })) ?? [];

    const teamCount = teamNames.length;

    /* 4️⃣ USAGE */
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);
    const from = fromDate.toISOString().split("T")[0];

    const { data: usageRows } = await supabase
      .from("usage")
      .select("date, api_calls")
      .eq("workspace_id", workspace.id)
      .gte("date", from)
      .order("date", { ascending: true });

    const total30d =
      usageRows?.reduce((sum, row) => sum + row.api_calls, 0) ?? 0;

    const quota = QUOTA[workspace.plan === "free" ? "free" : "pro"];
    const percentage = Math.min(Math.round((total30d / quota) * 100), 100);

    /* 5️⃣ FINAL RESPONSE */
    return {
      workspace,
      teamCount,
      teamNames,
      usage: {
        total30d,
        quota,
        percentage,
        daily: usageRows ?? [],
      },
    };
  } catch (e) {
    console.log(e);
    throw new Error("WORKSPACE_NOT_FOUND");
  }
}

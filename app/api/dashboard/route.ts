import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const QUOTA = {
  free: 50000,
  pro: 2000000,
};

export async function GET() {
  const supabase = await createClient();

  /* 1. Get logged-in user */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // console.log("user: ", user.id, user.email);

  /* 2. Get workspace_id */
  // const { data: membership, error: memberError } = await supabase
  //   .from("workspace_members")
  //   .select("workspace_id")
  //   .eq("user_id", user.id)
  //   .eq("role", "owner")
  //   .single();

  // console.log("membership: ", membership);

  // if (memberError || !membership) {
  //   console.log("memberError: ", memberError.message);
  //   return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  // }

  // const workspaceId = membership.workspace_id;

  /* 3. Workspace info */
  const { data: workspace } = await supabase
    .from("workspaces")
    .select("id, name, plan")
    .eq("owner", user.id)
    .single();

  /* 4. Team count */
  const { data: teamNames } = await supabase
    .from("workspace_members")
    .select("userinfo(firstname,lastname)")
    .eq("workspace_id", workspace?.id);
  const teamCount = teamNames?.length;

  console.log(teamNames);

  /* 5. Usage (last 30 days) */
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 30);

  const from = fromDate.toISOString().split("T")[0];

  const { data: usageRows } = await supabase
    .from("usage")
    .select("date, api_calls")
    .eq("workspace_id", workspace?.id)
    .gte("date", from)
    .order("date", { ascending: true });

  console.log("usageRows: ", usageRows);

  const total30d = usageRows?.reduce((sum, row) => sum + row.api_calls, 0) ?? 0;

  const quota = QUOTA[workspace?.plan == "free" ? "free" : "pro"];
  const percentage = Math.min(Math.round((total30d / quota) * 100), 100);

  // console.log(workspace);

  /* 6. Final response */
  return NextResponse.json({
    workspace,
    teamCount,
    teamNames,
    usage: {
      total30d,
      quota,
      percentage,
      daily: usageRows ?? [],
    },
  });
}

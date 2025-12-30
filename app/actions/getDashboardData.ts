// "use server";

// import { DashboardDataType } from "@/utils/intefaces_types";
// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";

// const QUOTA = {
//   free: 50000,
//   pro: 2000000,
// };

// export async function getDashboardData(): Promise<DashboardDataType | null> {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     redirect("/login");
//     //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   /* 3. Workspace info */
//   const { data: workspace } = await supabase
//     .from("workspaces")
//     .select("id, name, plan")
//     .eq("owner", user.id)
//     .single();

//   /* 4. Team count */
//   //   const { data: teamNames } = await supabase
//   //     .from("workspace_members")
//   //     .select("userinfo!inner(firstname,lastname)")
//   //     .eq("workspace_id", workspace?.id);

//   const rawTeamNames = await supabase
//     .from("workspace_members")
//     .select("userinfo(firstname,lastname)")
//     .eq("workspace_id", workspace?.id);

//   const teamNames =
//     rawTeamNames.data
//       ?.map((row) => {
//         console.log("Row: ", row.userinfo);
//         return row.userinfo[0];
//       })
//       .filter(Boolean) ?? [];
//   const teamCount = teamNames?.length;

//   // console.log(teamNames);

//   /* 5. Usage (last 30 days) */
//   const fromDate = new Date();
//   fromDate.setDate(fromDate.getDate() - 30);

//   const from = fromDate.toISOString().split("T")[0];

//   const { data: usageRows } = await supabase
//     .from("usage")
//     .select("date, api_calls")
//     .eq("workspace_id", workspace?.id)
//     .gte("date", from)
//     .order("date", { ascending: true });

//   // console.log("usageRows: ", usageRows);

//   const total30d = usageRows?.reduce((sum, row) => sum + row.api_calls, 0) ?? 0;

//   const quota = QUOTA[workspace?.plan == "free" ? "free" : "pro"];
//   const percentage = Math.min(Math.round((total30d / quota) * 100), 100);
//   console.log({
//     workspace,
//     teamCount,
//     teamNames,
//     usage: {
//       total30d,
//       quota,
//       percentage,
//       daily: usageRows ?? [],
//     },
//   });

//   if (workspace && teamCount) {
//     return {
//       workspace,
//       teamCount,
//       teamNames,
//       usage: {
//         total30d,
//         quota,
//         percentage,
//         daily: usageRows ?? [],
//       },
//     };
//   } else {
//     return null;
//   }
// }

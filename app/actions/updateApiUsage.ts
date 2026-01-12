import { createClient } from "@/utils/supabase/server";

export async function updateAPIUsage(workspace_id: string) {
  const supabase = await createClient();

  const p_date = new Date().toISOString().slice(0, 10);

  const { error } = await supabase.rpc("increment_api_calls_with_quota", {
    p_workspace_id: workspace_id,
    p_date: p_date,
  });
  if (error) return Response.json({ error: "Api Limit Reached for today" });
}

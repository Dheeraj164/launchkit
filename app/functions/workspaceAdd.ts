/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseClient } from "@supabase/supabase-js";


export async function workspaceAdd({
  supabase,
  workspaceName
}: {
  supabase: SupabaseClient<any, "public", "public", any, any>;
  workspaceName:string
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const time = new Date();

  await supabase.from("workspaces").insert({
    name: workspaceName,
    owner: user.id,
    created_at: time,
    plan: "free",
  });
}

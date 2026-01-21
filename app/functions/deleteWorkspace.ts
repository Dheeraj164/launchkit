/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseClient } from "@supabase/supabase-js";

export async function deletedWorkspace({
  supabase,
  workspaceId,
  userId,
}: {
  supabase: SupabaseClient<any, "public", "public", any, any>;
  workspaceId: string;
  userId: string;
}) {
  const { error } = await supabase
    .from("workspaces")
    .delete()
    .eq("workspace_id", workspaceId)
    .eq("owner", userId);

  if (error) return { message: "Error While deleting the workspace" };
  return { message: "Workspace Deleted Succefully" };
}

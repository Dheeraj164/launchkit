/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseClient } from "@supabase/supabase-js";

export async function deleteWorkspace({
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
    .eq("id", workspaceId)
    .eq("owner", userId);

  if (error) {
    console.log(error);
    return { message: "Error While deleting the workspace" };
  }
  return { message: "Workspace Deleted Succefully" };
}

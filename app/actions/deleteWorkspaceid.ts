"use server";

import { createClient } from "@/utils/supabase/server";
import { deleteWorkspace } from "../functions/deleteWorkspace";

export async function deleteWorkspaceId({
  workspace_id,
}: {
  workspace_id: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { message: "Unautorized user" };
  }
  return await deleteWorkspace({
    supabase,
    userId: user.id,
    workspaceId: workspace_id,
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseClient } from "@supabase/supabase-js";
import { Workspace } from "../model/Workspace";

export async function workspacesData({
  supabase,
  userId,
}: {
  supabase: SupabaseClient<any, "public", "public", any, any>;
  userId: string;
}) {
  const { data: workspaceData, error } = await supabase
    .from("workspace")
    .select(
      "id, owner, clientName, clientEmail, deliverables, milestones, created_at",
    )
    .eq("owner", userId);

  if (error) {
    return {
      error: error.message,
      data: null,
    };
  }

  const data = workspaceData.map((w) => new Workspace(w));
  return {
    error: null,
    data: data,
  };
}


/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseClient } from "@supabase/supabase-js";
import { Workspace } from "../model/Workspace";

export async function workspaceAdd({
  supabase,
  workspace,
}: {
  supabase: SupabaseClient<any, "public", "public", any, any>;
  workspace: {
    owner: string;
    name: FormDataEntryValue | null;
    clientName: FormDataEntryValue | null;
    clientEmail: FormDataEntryValue | null;
    deliverables: FormDataEntryValue | null;
    milestones: {
      title: string;
      rate: string;
      dueDate: string;
    }[];
  };
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unautorized User", data: null };
  // const time = new Date();

  const { data, error } = await supabase
    .from("workspace")
    .insert(workspace)
    .select(
      "id, name, owner, clientName, clientEmail, deliverables, milestones, created_at",
    )
    .single();
  if (error || !data) {
    console.log(error);
    return { error: error.message, data: null };
  }

  return { data: new Workspace(data), error: null };
}

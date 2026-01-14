"use server";
import { createClient } from "@/utils/supabase/server";

export async function addWorkspace(formData: FormData) {
  const workspaceName = formData.get("workspaceName") as string;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No user Found", message: null };
  const time = new Date();

  const { error } = await supabase.from("workspaces").insert({
    name: workspaceName,
    owner: user.id,
    created_at: time,
    plan: "free",
  });
  if (error)
    return {
      error: "Error while creating a new Workspace Place Retry",
      message: null,
    };
  return { error: null, message: `Workspace: ${workspaceName} created ` };
}

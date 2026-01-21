"use server";
import { createClient } from "@/utils/supabase/server";
import { workspaceAdd } from "../functions/workspaceAdd";

export async function addWorkspace(formData: FormData) {
  const workspaceName = formData.get("workspaceName") as string;
  const supabase = await createClient();

  return workspaceAdd({ supabase, workspaceName });
}

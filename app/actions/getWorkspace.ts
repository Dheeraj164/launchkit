import { createClient } from "@/utils/supabase/server";
import { workspacesData } from "../functions/workspacesData";

export async function getWorkspace() {
  const supabase = await createClient();

  /* 1️⃣ Auth check */
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return { error: "Unauthorized", data: null };
  }
  return await workspacesData({ supabase, userId: user.id });
}

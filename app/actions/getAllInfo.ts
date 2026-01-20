"use server";

import { createClient } from "@/utils/supabase/server";
import { adminData } from "../functions/adminData";

export async function getAllInfo() {
  const supabase = await createClient();

  /* 1️⃣ Get logged-in user */
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Unauthorized", data: null };
  }

  return await adminData({ supabase });
}

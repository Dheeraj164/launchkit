"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUserData() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const { data, error } = await supabase
      .from("userinfo")
      .select("id, email, firstname, lastname, phonenumber, created_at")
      .eq("id", user?.id)
      .single();

    if (error) {
      console.warn("getUser error:", error);
      return { error: error, data: null };
    }
    if (data) {
      return { error: null, data: data };
    }
  } catch (err) {
    return { error: err, data: null };
  }
  return { error: null, data: null };
}

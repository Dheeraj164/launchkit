"use server";

import { createClient } from "@/utils/supabase/server";

export async function verifyUser(identifier: string) {
  const supabase = await createClient();

  if (!identifier || identifier.trim().length < 3) {
    return { error: "Invalid input", user: null };
  }

  // check by email OR username
  const { data, error } = await supabase
    .from("userinfo")
    .select("id, email, firstname, lastname")
    .or(`email.eq.${identifier},username.eq.${identifier}`)
    .single();

  if (error || !data) {
    return { error: "User not found", user: null };
  }

  return { error: null, user: data };
}

export async function searchUsers(query: string) {
  const supabase = await createClient();

  if (!query || query.length < 2) return [];

  const { data, error } = await supabase
    .from("userinfo")
    .select("id, firstname, lastname, email")
    .or(
      `email.ilike.%${query}%,firstname.ilike.%${query}%,lastname.ilike.%${query}%`
    )
    .limit(5);

  if (error) return [];

  return data;
}

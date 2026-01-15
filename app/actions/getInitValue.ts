"use server";
import { User } from "@/model/User";
import { createClient } from "@/utils/supabase/server";

export async function getInitValue(): Promise<
  | {
      error: string;
      data: null;
    }
  | {
      error: null;
      data: User;
    }
> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No user Found", data: null };
  }

  const { data: userData, error: userError } = await supabase
    .from("userinfo")
    .select("id, email, firstname, lastname, phonenumber, role, created_at")
    .eq("id", user.id)
    .single();

  if (userError || !userData) return { error: "No user Found", data: null };

  const newUser = new User({
    id: userData.id,
    email: userData.email,
    firstname: userData.firstname,
    lastname: userData.lastname,
    phonenumber: userData.phonenumber,
    role: userData.role,
    created_at: userData.created_at,
  });

  return { error: null, data: newUser };
}

"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function login(formdata: FormData) {
  const supabase = await createClient();
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;


  console.log(email,password)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error)
  }
  const { data: userData } = await supabase
    .from("userinfo")
    .select("role")
    .eq("id", data.user?.id)
    .single();
  if (userData?.role === "admin") redirect("/admin");
  redirect("/dashboard");
}




export const signinWithGoogle = async () => {
  const supabase = await createClient();

  const callbackURL = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;
  console.log(callbackURL);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackURL,
    },
  });
  if (error) console.log(error)

  if (data && data.url) {
    console.log(data.url);

    redirect(data.url);
  }
};

export const signout = async () => {
  const supabase = await createClient();

  console.log("calling");
  supabase.auth.signOut();
};
